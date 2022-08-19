const PDFDocument = require('pdfkit');
const doc = new PDFDocument;

function buildPDF(){
  const doc = new PDFDocument(dataCallback,endCallback);
  doc.on('data',dataCallback);
  doc.on('end',endCallback);
  doc.fontsize(25).text('some text');
  doc.end();
}
module.exports={ buildPDF };