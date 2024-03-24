const express = require('express');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const bodyParser = require('body-parser');
const readline = require('readline');
const multer = require('multer');
const cors = require('cors');
const AdmZip = require('adm-zip');
const  Description  = require('./Description');
const archiver = require('archiver');
const e = require('express');
const karmaShFile = require('./karmaShFile');
const modelsTest = require('./modelsTest');
const { testNames } = require('./nunitShFile');
const { readAndStoreEchoStatements } = require('./shEchoStatements');
const { processRunShFile } = require('./weightageShFile');
const httpTest = require('./httpTest');


const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

function extractZip(zipFilePath, destinationFolder) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: destinationFolder }))
      .on('finish', () => resolve())
      .on('error', (err) => reject(err));
  });
}

function readFolderContents(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

let runShFilePaths1 = [];
async function processZipFile(zipFilePath, evaluationTypes) {
  runShFilePaths1 = [];
  try {
    const zipFileNameWithoutExtension = path.basename(zipFilePath, '.zip');
    const extractionFolder = path.join(__dirname, 'dist1', zipFileNameWithoutExtension);

    if (!fs.existsSync(extractionFolder)) {
      fs.mkdirSync(extractionFolder, { recursive: true });
    }

    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(extractionFolder);

    const filesInExtractionFolder = await readFolderContents(extractionFolder);
    console.log(filesInExtractionFolder);

    // Assuming there's a subfolder inside with a dynamic name, find it
    const dynamicFolderName = filesInExtractionFolder.find((folder) =>
      fs.statSync(path.join(extractionFolder, folder)).isDirectory()
    );

    let subfolderContents;
    if (dynamicFolderName) {
      const subfolderPath = path.join(extractionFolder, dynamicFolderName);
       subfolderContents = await readFolderContents(subfolderPath);
    
      console.log(subfolderContents);
    }  
    // if(evaluationTypes == 'Karma'){
    //   await karmaShFile(extractionFolder, dynamicFolderName, subfolderContents);
    // }  

    if (!dynamicFolderName) {
      throw new Error('Dynamic folder not found');
    }

    const runShFilePaths = [];
    for (const type of evaluationTypes) {
      const lowercaseType = type.toLowerCase(); // Convert to lowercase
      console.log(lowercaseType);
      switch (lowercaseType) {
        case 'nunit': // Use 'nunit' with lowercase

          // const runShFilePath = path.join(extractionFolder, dynamicFolderName, 'nunit', 'run.sh');
          // runShFilePaths.push(runShFilePath);
          const csFilePath = path.join(extractionFolder, dynamicFolderName, 'nunit', 'Test', 'TestProject', 'UnitTest1.cs');
          const a = await testNames(csFilePath, extractionFolder, dynamicFolderName, subfolderContents);
          const runShFilePath = path.join(extractionFolder, dynamicFolderName, 'nunit', 'run.sh');
          console.log(runShFilePath);
          runShFilePaths.push(runShFilePath);
          runShFilePaths1.push(runShFilePath);
          // Read the content of the file asynchronously
          
          break;
        case 'karma':
          await karmaShFile(extractionFolder, dynamicFolderName, subfolderContents);

          const runShFilePath1 = path.join(extractionFolder, dynamicFolderName, 'karma', 'karma.sh');
          runShFilePaths.push(runShFilePath1);
          runShFilePaths1.push(runShFilePath1);
          break;
        default:
          throw new Error(`Invalid evaluation type: ${type}`);
      }
    }
    console.log(runShFilePaths);
    console.log(runShFilePaths1);
    // runShFilePaths1 = runShFilePaths || [];
    
    return runShFilePaths;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

app.post('/process-zip', upload.single('zipFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const zipFilePath = req.file.path;
  const evaluationTypes = req.body.evaluationTypes.split(',');

  try {
    const runShFilePaths = await processZipFile(zipFilePath, evaluationTypes);

    const evaluationTypeWeights = {}; // Store weights for each evaluation type
    for (const type of evaluationTypes) {
      evaluationTypeWeights[type] = 1.0 / evaluationTypes.length;
    }

    
    const jsonObjects = [];
    for (const runShFilePath of runShFilePaths) {
      const jsonString = await processRunShFile(runShFilePath, evaluationTypeWeights);
      const jsonObject = JSON.parse(jsonString);
      jsonObjects.push(jsonObject);
    }
    //if zip is present in the output folder then send response
  
      // if (runShFilePaths) {
    res.json(jsonObjects);

      //   // Send response only if the subfolder is successfully zipped
      //   res.json({ success: true, message: 'Subfolder successfully zipped' });
      // } else {
      //   res.status(500).json({ error: 'An error occurred during processing' });
      // }
    
    // res.json(jsonObjects);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during processing' });
  }
});

app.post('/model', upload.single('file'), async (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).send('No file uploaded.');
  }
  
  const zipFileNameWithoutExtension = path.basename(uploadedFile.path, '.zip');
    const extractionFolder = path.join(__dirname, 'dist1', zipFileNameWithoutExtension);

    if (!fs.existsSync(extractionFolder)) {
      fs.mkdirSync(extractionFolder, { recursive: true });
    }

    const zip = new AdmZip(uploadedFile.path);
    zip.extractAllTo(extractionFolder);

    const filesInExtractionFolder = await readFolderContents(extractionFolder);

    const dynamicFolderName = filesInExtractionFolder.find((folder) =>
      fs.statSync(path.join(extractionFolder, folder)).isDirectory()
    );
    let subfolderPath;
    let subfolderContents;
    if (dynamicFolderName) {
      subfolderPath = path.join(extractionFolder, dynamicFolderName);
       subfolderContents = await readFolderContents(subfolderPath);
    } 

    fs.readdir(subfolderPath, async (err, files) => { 
      if (err) {
        return res.status(500).send('Error reading the extracted folder.');
      }

      modelsTest(files,subfolderPath);
      res.send('Files processed and tests generated.');
    });
  });

  app.post('/httptest', upload.single('file'), async (req, res) => {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).send('No file uploaded.');
    }
    
    const zipFileNameWithoutExtension = path.basename(uploadedFile.path, '.zip');
      const extractionFolder = path.join(__dirname, 'dist1', zipFileNameWithoutExtension);
  
      if (!fs.existsSync(extractionFolder)) {
        fs.mkdirSync(extractionFolder, { recursive: true });
      }
  
      const zip = new AdmZip(uploadedFile.path);
      zip.extractAllTo(extractionFolder);
  
      const filesInExtractionFolder = await readFolderContents(extractionFolder);
  
      const dynamicFolderName = filesInExtractionFolder.find((folder) =>
        fs.statSync(path.join(extractionFolder, folder)).isDirectory()
      );
      let subfolderPath;
      let subfolderContents;
      if (dynamicFolderName) {
        subfolderPath = path.join(extractionFolder, dynamicFolderName);
         subfolderContents = await readFolderContents(subfolderPath);
      } 
  
      fs.readdir(subfolderPath, async (err, files) => { 
        if (err) {
          return res.status(500).send('Error reading the extracted folder.');
        }
  
        httpTest(files,subfolderPath);
        res.send('Files processed and tests generated.');
      });
    });

app.get('/downloadtest', (req, res) => {
  const filePath = path.join(__dirname, 'UnitTest1.cs');
  console.log(filePath);

  // Send the file as an attachment
  res.download(filePath, 'UnitTest1.cs', (err) => {
    if (err) {
      // Handle errors, e.g., file not found
      res.status(500).send('Error downloading the file.');
    }
  });
});

// app.get('/downloadzip', (req, res) => {
//   const fileName = req.query.fileName;
//   console.log(fileName);
//   const filePath = path.join(__dirname, "output", fileName);

//   console.log(filePath);

//   // Send the file as an attachment
//   res.download(filePath, fileName, (err) => {
//     if (err) {
//       // Handle errors, e.g., file not found
//       res.status(500).send('Error downloading the file.');
//     }
//   });
// });

app.get('/downloadziporsh', (req, res) => {
  const fileName = req.query.fileName;
  const type = req.query.type;
  if(fileName.includes('zip')){
  const filePath = path.join(__dirname, "output", fileName);
  console.log("run "+runShFilePaths1);
  console.log(filePath);
  console.log(fileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  // Send the file as an attachment
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading the file.');
    }
  });
}
else if(fileName.includes('sh')){
  console.log(runShFilePaths1);
  for (const runShFilePath of runShFilePaths1) {
    console.log(runShFilePath);
    console.log(type);
  if(runShFilePath.includes('karma') && type == 'karma'){
  console.log("run karma "+runShFilePath);
  const filePath = path.join(`${runShFilePath}`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  // Send the file as an attachment
  res.download(filePath, "run.sh", (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading the file.');
    }
  });
} else if(runShFilePath.includes('nunit') && type == 'nunit'){
  console.log("run nunit "+runShFilePath);
  const filePath = path.join(`${runShFilePath}`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  // Send the file as an attachment
  res.download(filePath, "run.sh", (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading the file.');
    }
  });
}
  }
}
});


app.post('/solution', (req, res) => {
  const models = req.body;

  if (!models || !Array.isArray(models)) {
      return res.status(400).json({ error: 'Invalid request payload' });
  }

  models.forEach(({ className, properties }) => {
      if (className && properties) {
          const modelContent = generateModelClass(className, properties);

          const directoryPath = path.join('D:', 'zip prpject', 'WEBAPI', 'dotnetapp', 'Models');
          if (!fs.existsSync(directoryPath)) {
              fs.mkdirSync(directoryPath, { recursive: true });
          }

          const fileName = path.join(directoryPath, `${className}.cs`);
          saveToFile(fileName, modelContent);
      }
  });

  res.json({ success: true, message: 'Model class files generated successfully' });
});

// Existing endpoint to generate DbContext file
app.post('/appdbcontexts', (req, res) => {
  const dbContextDefinitions = req.body;

  if (!dbContextDefinitions || !Array.isArray(dbContextDefinitions)) {
      return res.status(400).json({ error: 'Invalid request payload' });
  }

  dbContextDefinitions.forEach(({ dbContextClassName, dbContextProperties }) => {
      if (dbContextClassName && dbContextProperties) {
          const dbContextContent = generateDbContextClass(dbContextClassName, dbContextProperties);

          const directoryPath = path.join('D:', 'zip prpject', 'WEBAPI', 'dotnetapp', 'Models');
          if (!fs.existsSync(directoryPath)) {
              fs.mkdirSync(directoryPath, { recursive: true });
          }

          const fileName = path.join(directoryPath, `${dbContextClassName}.cs`);
          saveToFile(fileName, dbContextContent);
      }
  });

  res.json({ success: true, message: 'DbContext class files generated successfully' });
});

function generateModelClass(className, properties) {
  const template = `
namespace dotnetapp.Models
{
  public class ${className}
  {
${properties.map(({ name, type }) => `        public ${type} ${name} { get; set; }`).join('\n')}
  }
}
`;
  return template;
}

function generateDbContextClass(className, properties) {
  const template = `
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models
{
  public class ${className} : DbContext
  {
      public ${className}(DbContextOptions<${className}> options) : base(options)
      {
      }

${properties.map(({ name, type }) => `        public DbSet<${type}> ${name} { get; set; }`).join('\n')}
  }
}
`;
  return template;
}

function saveToFile(fileName, content) {
  fs.writeFileSync(fileName, content, 'utf-8');
  console.log(`File saved: ${fileName}`);
}

app.post('/description', upload.single('file'), async (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).send('No file uploaded.');
  }
  
  const zipFileNameWithoutExtension = path.basename(uploadedFile.path, '.zip');
    const extractionFolder = path.join(__dirname, 'dist1', zipFileNameWithoutExtension);

    if (!fs.existsSync(extractionFolder)) {
      fs.mkdirSync(extractionFolder, { recursive: true });
    }

    const zip = new AdmZip(uploadedFile.path);
    zip.extractAllTo(extractionFolder);

    const filesInExtractionFolder = await readFolderContents(extractionFolder);

    const dynamicFolderName = filesInExtractionFolder.find((folder) =>
      fs.statSync(path.join(extractionFolder, folder)).isDirectory()
    );
    let subfolderPath;
    let subfolderContents;
    if (dynamicFolderName) {
      subfolderPath = path.join(extractionFolder, dynamicFolderName);
       subfolderContents = await readFolderContents(subfolderPath);
    } 

    fs.readdir(subfolderPath, async (err, files) => { 
      if (err) {
        return res.status(500).send('Error reading the extracted folder.');
      }

      Description(files,subfolderPath);
      res.send('Files processed and tests generated.');
    });
  });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
