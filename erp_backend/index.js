const fs = require('fs');
const readline = require('readline');
const ExcelJS = require('exceljs');

// Path to your text file
const filePath = "./data/user.dat";

// Read data from the text file
const readInterface = readline.createInterface({
  input: fs.createReadStream(filePath),
});

const data = [];

readInterface.on('line', function (line) {
  // Assuming each line in the text file contains a name
  const name = line.trim().replace(/^\d+\.\s*/, ''); // Remove the number and dot
  data.push(name);
});

readInterface.on('close', function () {
  // Create a workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Add headers
  worksheet.addRow(['ID', 'Name']);

  // Add data to the worksheet
  data.forEach((name, index) => {
    worksheet.addRow([index + 1, name]);
  });

  // Save the workbook to a file
  workbook.xlsx.writeFile('index.xlsx')
    .then(() => {
      console.log('Excel file created successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
