const fs = require('fs');
const path = require('path');
const archiver = require('archiver');


async function testNames(csFilePath, extractionFolder, dynamicFolderName, subfolderContents) {
    console.log(csFilePath);
    console.log(subfolderContents);
    return new Promise(async (resolve, reject) => {

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
        dotnet build && dotnet test -l "console;verbosity=normal";
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
      console.log("outpt "+output.path);
      archive.pipe(output);
  
      const subfolderPath = path.join(parentFolderPath, subfolderName);
      archive.directory(subfolderPath,subfolderName, false);
  
      archive.finalize();
  
      output.on('close', () => {
        console.log('Subfolder successfully zipped.');
        resolve("true");
      });
  
      output.on('error', (err) => {
        console.error('Error zipping subfolder:', err);
        resolve("false");
      });
  
  
    } catch (err) {
      console.error(`Error reading file: ${err}`);
      reject(err);
    }
  }
  );
  }

module.exports = { testNames };
  