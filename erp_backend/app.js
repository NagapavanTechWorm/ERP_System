const fs = require('fs');
const ExcelJS = require('exceljs');

// Replace this with the path to your data file
const filePath = './data/login.dat';

// Read data from the text file
const rawData = fs.readFileSync(filePath, 'utf-8');
const lines = rawData.trim().split('\n');

// Create a workbook and add a worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');

// Add headers
worksheet.addRow(['ID', 'Date', 'Time']);

// Add data to the worksheet
lines.forEach((line) => {
  const [id, date, time] = line.trim().split(/\s+/);
  worksheet.addRow([id, date, time]);
});

// Save the workbook to a file
workbook.xlsx.writeFile('app.xlsx')
  .then(() => {
    console.log('Excel file created successfully!');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
