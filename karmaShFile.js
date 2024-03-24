const e = require("express");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");


async function karmaShFile(extractionFolder, dynamicFolderName, subfolderContents) {
    const dynamicFolderPath = path.join(extractionFolder, dynamicFolderName, 'karma');
    const filesInDynamicFolder = fs.readdirSync(dynamicFolderPath);
    const specFiles = filesInDynamicFolder.filter((fileName) => fileName.endsWith('.spec.ts'));
    const allKarmaTestNames = [];
    const filePath = path.join(extractionFolder, dynamicFolderName, 'karma', 'karma.sh');



    let scriptContent = `#!/bin/bash
export CHROME_BIN=/usr/bin/chromium
if [ ! -d "/home/coder/project/workspace/angularapp" ]
then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
`;

// Iterate through each file in specFiles
for (const fileName of specFiles) {
const fileNameParts = fileName.split('.');
const folderName = fileNameParts[0];
const fileTypeName = fileNameParts[1];
const fileExtension = fileNameParts[2];
console.log("fileExtension: ", fileExtension);
console.log("folderName: ", folderName);
console.log("fileType: ", fileTypeName);
const filePath = path.join(dynamicFolderPath, fileName);
const fileContent = fs.readFileSync(filePath, 'utf8');

scriptContent += `    # checking for ${fileName} component\n`;
if (fileTypeName == 'component') {
  scriptContent += `    if [ -d "/home/coder/project/workspace/angularapp/src/app/${folderName.toLowerCase()}" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/${folderName.toLowerCase()}/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
} else if (fileTypeName == 'service') {
  scriptContent += `    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/${folderName}.${fileTypeName}.ts" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/services/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
} else if (fileTypeName == 'pipe') {
  scriptContent += `    if [ -e "/home/coder/project/workspace/angularapp/src/app/pipes/${folderName}.${fileTypeName}.ts" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/pipes/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
} else if (fileTypeName == 'directive') {
  scriptContent += `    if [ -e "/home/coder/project/workspace/angularapp/src/app/directives/${folderName}.${fileTypeName}.ts" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/directives/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
} else if (fileTypeName == 'model') {
  scriptContent += `    if [ -e "/home/coder/project/workspace/angularapp/src/app/models/${folderName}.${fileTypeName}.ts" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/models/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
} else if (fileTypeName == 'guard') {
  scriptContent += `    if [ -e "/home/coder/project/workspace/angularapp/src/app/guards/${folderName}.${fileTypeName}.ts" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/guards/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
} else if (fileTypeName == 'interceptor') {
  scriptContent += `    if [ -d "/home/coder/project/workspace/angularapp/src/app/interceptors" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/interceptors/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
} else if (fileTypeName == 'module') {
  scriptContent += `    if [ -d "/home/coder/project/workspace/angularapp/src/app/modules" ]\n`;
  scriptContent += `    then\n`;
  scriptContent += `        cp /home/coder/project/workspace/karma/${fileName.toLowerCase()} /home/coder/project/workspace/angularapp/src/app/modules/${fileName.toLowerCase()};\n`;
  scriptContent += `    else\n`;
}

// Define a regular expression to match test names
const testRegex = /(?<!\/\/.*)fit\(['"](.+?)['"]/g;
const karmatestNames = [];
let match;

// Find and store all test names in the array
while ((match = testRegex.exec(fileContent)) !== null) {
  const testName = match[1];
  karmatestNames.push(testName);
  scriptContent += `        echo "${testName} FAILED";\n`;
}
scriptContent += `    fi\n
`;

allKarmaTestNames.push(...karmatestNames);
}
console.log("Karma test names: ", allKarmaTestNames);

scriptContent += `    if [ -d "/home/coder/project/workspace/angularapp/node_modules" ]; 
    then
        cd /home/coder/project/workspace/angularapp/
        npm test;
    else
        cd /home/coder/project/workspace/angularapp/
        yes | npm install
        npm test
    fi 
else   
    ${allKarmaTestNames.map(testName => `echo "${testName} FAILED";`).join('\n    ')}
fi
`;

// console.log(scriptContent);

await fs.writeFile(filePath, scriptContent, (err) => {
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
archive.directory(subfolderPath,subfolderName, false);

archive.finalize();

output.on('close', () => {
console.log('Subfolder successfully zipped.');
});

output.on('error', (err) => {
console.error('Error zipping subfolder:', err);
});

}

module.exports = karmaShFile;    
