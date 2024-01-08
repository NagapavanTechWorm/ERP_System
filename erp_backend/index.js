const fs = require('fs');
const readline = require('readline');
const ExcelJS = require('exceljs');

// Function to process user.dat file and return a Promise
function processUserDat(filePath) {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    const userData = [];

    readInterface.on('line', function (line) {
      const name = line.trim().replace(/^\d+\.\s*/, '');
      userData.push(name);
    });

    readInterface.on('close', function () {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('UserSheet');

      worksheet.addRow(['ID', 'Name']);

      userData.forEach((name, index) => {
        worksheet.addRow([index + 1, name]);
      });

      workbook.xlsx.writeFile('user.xlsx')
        .then(() => {
          console.log('User Excel file created successfully!');
          resolve();
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  });
}

// Function to process login.dat file and return a Promise
function processLoginDat(filePath) {
  return new Promise((resolve, reject) => {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const lines = rawData.trim().split('\n');

    const loginData = [];

    lines.forEach((line) => {
      const [id, date, time] = line.trim().split(/\s+/);
      loginData.push([id, date, time]);
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('LoginSheet');

    worksheet.addRow(['ID', 'Date', 'Time']);

    loginData.forEach((data) => {
      worksheet.addRow(data);
    });

    workbook.xlsx.writeFile('login.xlsx')
      .then(() => {
        console.log('Login Excel file created successfully!');
        resolve();
      })
      .catch((error) => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

// Call the functions with their respective file paths
const userFilePath = './data/user.dat';
const loginFilePath = './data/login.dat';

// Example usage of promises
processUserDat(userFilePath)
  .then(() => processLoginDat(loginFilePath))
  .then(() => console.log('All files created successfully!'))
  .catch((error) => console.error('Error:', error));
