var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var docToPdf = require('./doctopdf');
var fs = require('fs');
var path = require('path');

// function verifDirectory(dir) {
//     if (!fs.existsSync(dir)){
//         fs.mkdirSync(dir);
//     }
// }

module.exports = async function (data) {
    //Load the docx file as a binary
    var content = fs.readFileSync(path.resolve(__dirname, 'BR_TEMPLATE.docx'), 'binary');
    // Zip content binary data
    var zip = new PizZip(content);
    // Instanciate the docx templater
    var doc = await new Docxtemplater();
    // load the zipped content
    await doc.loadZip(zip);
    //set the templateVariables (fill the template variables ex {firstname}, {lastname} ...)
    await doc.setData(data.data);

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        await doc.render()
    }
    catch (error) {

        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }

        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var buf = await doc.getZip().generate({type: 'nodebuffer'});
    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    var docOutputPath = path.resolve(__dirname, `/page-employe.docx`)

    fs.writeFileSync(docOutputPath, buf);
    
    return docToPdf(docOutputPath);
    
}