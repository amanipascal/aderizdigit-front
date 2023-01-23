// var msopdf = require('');
var path = require('path');
var officeToPdf = require("office-to-pdf")
var fs = require("fs")
const pdf2base64 = require('pdf-to-base64');

module.exports = async function(docOutPutPath) {

    var dirname = path.dirname(docOutPutPath);

    var pdfFilePath = `${dirname}/${path.parse(docOutPutPath).name}.pdf`;

    var wordBuffer = fs.readFileSync(docOutPutPath)

    var pdfBase64 = '';

    await officeToPdf(wordBuffer).then(
        async (pdfBuffer) => {
           fs.writeFileSync(pdfFilePath, pdfBuffer);
      
          pathToReturn = pdfFilePath;
          await pdf2base64(pdfFilePath).then(response => {
            pdfBase64 = response
          }).catch(err => {
            console.log(err);
          })
          if (fs.existsSync(docOutPutPath)) {
            fs.unlink(docOutPutPath, (err) => {
              if (err) {
                console.log('unlink err: ', err)
              }
            })
          }
        }, (err) => {
          console.log(err)
        }
        
    );

    return pdfBase64;
}