const e = require("express");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

async function Description(files, subfolderPath) {
    let testContent = ``;
    let modelCount = 1;
    files.forEach((file) => {
        testContent += `${file}\n`;
        if(path.extname(file) === '.cs'){
            // testContent += `This is a C# file\n`;
            const filePath = path.join(subfolderPath, file);
            const fileContent = fs.readFileSync(filePath, "utf8");
            let dbContextMatch = fileContent.match(/public class (\w+) : DbContext/);
            let ModelsnamespaceMatch = fileContent.match(/namespace (\w+\.Models)/);
            let ControllernamespaceMatch = fileContent.match(/namespace (\w+\.Controllers)/);
            if(ModelsnamespaceMatch && !dbContextMatch){
                const propertyRegex2 = /(\[.*?\])?\s*public (\w+) (\w+) { get; set; }/g;
                let classNameMatch = fileContent.match(/public class (\w+)/);
                const className = classNameMatch[1];
                testContent += `This file has a namespace: ${ModelsnamespaceMatch[1]}\n`;
                testContent += `Model:
${modelCount}. The model class name should be \"${className}\" with the following properties:\n`;
                modelCount++;
                let match3;
                while ((match3 = propertyRegex2.exec(fileContent)) !== null) {
                    const annotation = match3[1] || 'No Annotation';
                    const propertyName = match3[3];
                    console.log('type',match3[2]);
                    console.log('anno',match3[1]);
                    if(match3[1] === 'Key' || match3[3].toLowerCase() === 'id' || match3[3].toLowerCase() === `${className}id`){
                        testContent += `   • ${propertyName}: Unique identifier for the ${className} model with data type \"${match3[2]}\" (Should be auto-incremented)\n`;
                    } else if(annotation.includes('Required')){
                        const match = annotation.match(/Required(?:.*?ErrorMessage = "(.*?)")?/);
                        if(match[1]){
                            testContent += `   • ${propertyName}: Name of the ${className} model and should be required field with data type \"${match3[2]}\" with error message \"${match[1]}\"\n`;
                        } else {
                            testContent += `   • ${propertyName}: Name of the ${className} model and should be required field with data type \"${match3[2]}\"\n`;
                        }
                    } else if(annotation.includes('StringLength')){
                        testContent += `   • ${propertyName}: Property of the ${className} model with a maximum length of \"${match3[1]}\" and data type \"${match3[2]}\"\n`;
                    } else if(annotation.includes('ForeignKey')){
                        testContent += `   • ${propertyName}: Property of the ${className} model with a foreign key and data type \"${match3[2]}\"\n`;
                    } else if(annotation.includes('MaxLength')){                            
                        const maxLengthMatch = annotation.match(/MaxLength\((\d+)(?:.*?ErrorMessage = "(.*?)")?\)/);
                        if(maxLengthMatch[2]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a maximum length of \"${maxLengthMatch[1]}\" and data type \"${match3[2]}\" with error message \"${maxLengthMatch[2]}\"\n`;
                        } else if(maxLengthMatch[1]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a maximum length of \"${maxLengthMatch[1]}\" and data type \"${match3[2]}\"\n`;
                        }
                    } else if(annotation.includes('MinLength')){
                        const match = annotation.match(/MinLength\((\d+)(?:.*?ErrorMessage = "(.*?)")?\)/);
                        if(match[2]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a minimum length of \"${match[1]}\" and data type \"${match3[2]}\" with error message \"${match[2]}\"\n`;
                        } else if(match[1]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a minimum length of \"${match[1]}\" and data type \"${match3[2]}\"\n`;
                        }
                    } else if(annotation.includes('Range')){
                        const match = annotation.match(/Range\((\d+), (\d+)(?:.*?ErrorMessage = "(.*?)")?\)/);
                        if(match[3]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a range of \"${match[1]}\" to \"${match[2]}\" and data type \"${match3[2]}\" with error message \"${match[3]}\"\n`;
                        } else if(match[1]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a range of \"${match[1]}\" to \"${match[2]}\" and data type \"${match3[2]}\".\n`;
                        }
                    } else if(annotation.includes('RegularExpression')){
                        const regexMatch = annotation.match(/RegularExpression\(@"(.*?)".*?ErrorMessage = "(.*?)"/);
                        if(regexMatch[2]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a regular expression of \"${regexMatch[1]}\" and data type \"${match3[2]}\" with error message \"${regexMatch[2]}\"\n`;
                        } else if(regexMatch[1]){
                            testContent += `   • ${propertyName}: Property of the ${className} model with a regular expression of \"${regexMatch[1]}\" and data type \"${match3[2]}\"\n`;
                        }
                    } else if(annotation.includes('DataType')){    
                        testContent += `   • ${propertyName}: Property of the ${className} model with a data type of \"${match3[1]}\" and data type ${match3[2]}\n`;
                    } else {
                        testContent += `   • ${propertyName}: Property of the ${className} model with data type \"${match3[2]}\"\n`;
                    }
                }                
            }
            else if(dbContextMatch){
                const dbContextName = dbContextMatch[1];
                
                testContent += `This file has a DbContext class: ${dbContextName}\n`;
                testContent += `${modelCount}. ${dbContextName}:
    • The ${dbContextName} class should be created in ${ModelsnamespaceMatch[1].split('.')[1]} folder with namespace ${ModelsnamespaceMatch[1]}.
    • Define a DbSet for the`;
                const propertyRegex = /public DbSet<(\w+)> (\w+) { get; set; }/g;
                let match;
                let dbSets = [];

                while ((match = propertyRegex.exec(fileContent)) !== null) {
                    const dbSetName = match[2];
                    const dbSetType = match[1];
                    dbSets.push({dbSetType, dbSetName});
                }
                if(dbSets.length === 1){
                    testContent += ` table`;
                } else {
                    testContent += ` tables`;
                }
                for(let i = 0; i < dbSets.length; i++){
                    if(i === dbSets.length - 1){
                        testContent += `and ${dbSets[i].dbSetName}) `;
                    } else if(dbSets.length != 1){
                        testContent += `(${dbSets[i].dbSetName}, `;
                    } else {
                        testContent += `(${dbSets[i].dbSetName}) `;
                    }
                }
                testContent += `in the ${dbContextName} class.\n`;                
            }
            else if(ControllernamespaceMatch){
                const controllerNameMatch = fileContent.match(/public class (\w+)/);
                const controllerName = controllerNameMatch[1];
                testContent += `This file has a namespace: ${ControllernamespaceMatch[1]}\n`;
                testContent += `${modelCount}. ${controllerName}:`;
                testContent += `The controller class name should be \"${controllerName}\" with the following Methods:\n`;
                modelCount++;
                const methodRegex = /public (\w+) (\w+)\((.*?)\)/g;
                let match;
                let methods = [];
                while ((match = methodRegex.exec(fileContent)) !== null) {
                    const methodName = match[2];
                    const methodType = match[1];
                    const methodParams = match[3];
                    methods.push({methodType, methodName, methodParams});
                    console.log('method',methods);
                }
            }
        }
    });
    const testFileName = `description.txt`;
    fs.writeFileSync(testFileName, testContent);
}


module.exports = Description;