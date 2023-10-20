const express = require('express');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const readline = require('readline');
const multer = require('multer');
const cors = require('cors');
const AdmZip = require('adm-zip');
const archiver = require('archiver');


const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:4200' }));

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

function readAndStoreEchoStatements(filePath) {
  return new Promise((resolve, reject) => {
    const echoStatements = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      if (line.startsWith('    echo ') && line.endsWith('FAILED";')) {
        echoStatements.push(line.substring(10, line.length - 9));
      }
    });

    rl.on('close', () => {
      resolve(echoStatements);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}

async function processRunShFile(runShFilePath, evaluationTypeWeights) {
  try {
    const echoStatements = await readAndStoreEchoStatements(runShFilePath);

    // Determine the evaluation type based on the folder name
    const folderName = path.basename(path.dirname(runShFilePath));
    console.log("1"+folderName);
    let jsonObject;
    if(folderName == "karma")
    {
       jsonObject = {
        evaluation_type: "Karma", 
        testcases: [],
        testcase_run_command: `sh /home/coder/project/workspace/karma/karma.sh`, 
        testcase_path: '/home/coder/project/workspace/karma', 
      };
    }
    if(folderName == "nunit")
    {
       jsonObject = {
        evaluation_type: "NUnit", // Use the folder name as the evaluation type
        testcases: [],
        testcase_run_command: `sh /home/coder/project/workspace/nunit/run.sh`, 
        testcase_path: '/home/coder/project/workspace/nunit', 
      };
    }


    // Calculate the weightage per test case for this evaluation type
    const weightagePerTestCase = 1.0 / echoStatements.length;

    // Set the weightages for test cases within this evaluation type
    for (const echoStatement of echoStatements) {
      jsonObject.testcases.push({
        name: echoStatement,
        weightage: weightagePerTestCase,
      });
    }

    // Normalize the weightages based on evaluation type weights
    const totalWeightage = evaluationTypeWeights[jsonObject.evaluation_type] || 0;
    if (totalWeightage === 0) {
      throw new Error(`Invalid evaluation type: ${jsonObject.evaluation_type}`);
    }

    for (const testcase of jsonObject.testcases) {
      testcase.weightage *= totalWeightage;
    }

    const jsonString = JSON.stringify(jsonObject, null, 2);
    // console.log(jsonString);

    return jsonString;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

async function testNames(csFilePath, extractionFolder, dynamicFolderName, subfolderContents) {
  console.log(csFilePath);
  console.log(subfolderContents);
  try {
    const data = fs.readFileSync(csFilePath, 'utf8');
    
    // const regex = /\[Test\]\s+public\s+void\s+(\w+)\(/g;
    // const testNames = [];
    
    // let match;
    // while ((match = regex.exec(data)) !== null) {
    //   // match[1] contains the captured test method name
    //   testNames.push(match[1]);
    // }
    // const regex = /\[Test\]\s+public\s+(async\s+)?(Task\s+)?(\w+)\(/g;
    const regex = /\[Test\]\s+public\s+(async\s+)?\w+\s+(\w+)\(/g;
    const testNames = [];
    
    let match;
    while ((match = regex.exec(data)) !== null) {
      // match[3] contains the captured test method name
      const methodName = match[3];
      const asyncKeyword = match[1] || '';
      const taskKeyword = match[2] || '';

      const fullMethodName = taskKeyword;
      
      testNames.push(fullMethodName);
    }

    console.log('Test Names:');
    console.log(testNames);
    let dotnetapp;
    const filePath = path.join(extractionFolder, dynamicFolderName, 'nunit', 'run.sh');
    for (const app of subfolderContents){
      if(app != 'nunit' && app != 'karma' && app != 'angularapp'){
        dotnetapp = app;
      }
    }
    console.log(dotnetapp);

    const fileContent = `#!/bin/bash
if [ ! -d "/home/coder/project/workspace/${dotnetapp}/" ]
then
    cp -r /home/coder/project/workspace/nunit/${dotnetapp} /home/coder/project/workspace/;
fi
if [ -d "/home/coder/project/workspace/${dotnetapp}/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/${dotnetapp}/" ]
    then
        cp -r /home/coder/project/workspace/nunit/test/TestProject /home/coder/project/workspace/;
        cp -r /home/coder/project/workspace/nunit/test/${dotnetapp}.sln /home/coder/project/workspace/${dotnetapp}/;
        cd /home/coder/project/workspace/${dotnetapp} || exit;
        dotnet clean;
        dotnet test;
    else
        ${testNames.map(testName => `echo "${testName} FAILED";`).join('\n        ')}
    fi
else
    ${testNames.map(testName => `echo "${testName} FAILED";`).join('\n    ')}
fi
    `;

    await fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(`Error creating file: ${err}`);
      } else {
        console.log(`File '${filePath}' created successfully.`);
      }
    });

    const parentFolderPath = extractionFolder;

    const subfolderName = dynamicFolderName;

    const outputFolderPath = path.join('output');
    fs.mkdirSync(outputFolderPath, { recursive: true });

    const output = fs.createWriteStream(path.join(outputFolderPath, `${dynamicFolderName}.zip`));

    const archive = archiver('zip', {
      zlib: { level: 9 }, 
    });

    archive.pipe(output);

    const subfolderPath = path.join(parentFolderPath, subfolderName);
    archive.directory(subfolderPath, false);

    archive.finalize();

    output.on('close', () => {
      console.log('Subfolder successfully zipped.');
    });

    output.on('error', (err) => {
      console.error('Error zipping subfolder:', err);
    });


  } catch (err) {
    console.error(`Error reading file: ${err}`);
  }

}

async function processZipFile(zipFilePath, evaluationTypes) {
  try {
    const zipFileNameWithoutExtension = path.basename(zipFilePath, '.zip');
    const extractionFolder = path.join(__dirname, 'dist1', zipFileNameWithoutExtension);

    if (!fs.existsSync(extractionFolder)) {
      fs.mkdirSync(extractionFolder, { recursive: true });
    }

    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(extractionFolder);

    const filesInExtractionFolder = await readFolderContents(extractionFolder);

    // Assuming there's a subfolder inside with a dynamic name, find it
    const dynamicFolderName = filesInExtractionFolder.find((folder) =>
      fs.statSync(path.join(extractionFolder, folder)).isDirectory()
    );
    let subfolderContents;
    if (dynamicFolderName) {
      const subfolderPath = path.join(extractionFolder, dynamicFolderName);
       subfolderContents = await readFolderContents(subfolderPath);
    
      // Now, subfolderContents will contain an array of files and folders inside the dynamic subfolder
      console.log(subfolderContents);
    }    

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
          await testNames(csFilePath, extractionFolder, dynamicFolderName, subfolderContents);
          const runShFilePath = path.join(extractionFolder, dynamicFolderName, 'nunit', 'run.sh');
          console.log(runShFilePath);
          runShFilePaths.push(runShFilePath);
          // Read the content of the file asynchronously
          
          break;
        case 'karma':
          const runShFilePath1 = path.join(extractionFolder, dynamicFolderName, 'karma', 'karma.sh');
          runShFilePaths.push(runShFilePath1);
          break;
        default:
          throw new Error(`Invalid evaluation type: ${type}`);
      }
    }

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
    res.json(jsonObjects);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during processing' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
