import express from "express";
import fs from 'fs';
import readline from 'readline';
import ExcelJS from 'exceljs';

const app = express();
const PORT = 3000;

app.get("/user", async (req, res) => {
  const userFilePath = './data/user.dat';

  try {
    const userData = await processUserDat(userFilePath);
    res.json(userData);
  } catch (err) {
    console.error('Error processing user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/login", async (req, res) => {
  const loginFilePath = './data/login.dat';
  const targetDate = '03-12-2023';
  const startTime = '20:00';
  const endTime = '22:00';

  try {
    const loginData = await processLoginDat(loginFilePath, targetDate, startTime, endTime);
    res.json(loginData);
  } catch (err) {
    console.error('Error processing login data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/sms", async (req, res) => {
  try {
    const comparisonData = await compareData();
    res.json(comparisonData);
  } catch (err) {
    console.error('Error comparing data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});

async function compareData() {
  const userFilePath = 'user.xlsx';
  const loginFilePath = 'login.xlsx';

  return new Promise(async (resolve, reject) => {
    try {
      const userWorkbook = await readExcel(userFilePath);
      const loginWorkbook = await readExcel(loginFilePath);

      const userWorksheet = userWorkbook.getWorksheet('UserSheet');
      const loginWorksheet = loginWorkbook.getWorksheet('LoginSheet');

      const userData = [];

      userWorksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          const userId = row.values[1];
          const userName = row.values[2];
          const status = findStatus(userId, loginWorksheet);
          userData.push({ id: userId, name: userName, status });
          userWorksheet.getCell(`C${rowNumber}`).value = status;
        }
      });

      await userWorkbook.xlsx.writeFile('user_uped.xlsx');

      const responseData = {
        data: userData,
        message: 'Comparison data retrieved successfully',
      };

      resolve(responseData);
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
}

function findStatus(userId, loginWorksheet) {
  let status = 'absent';

  loginWorksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1) { // Skip header row
      const loginId = row.values[1];
      if (loginId === userId) {
        status = 'present';
      }
    }
  });

  return status;
}

async function readExcel(filePath) {
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(filePath)
      .then(() => {
        resolve(workbook);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function processUserDat(filePath) {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    const userData = [];

    readInterface.on('line', function (line) {
      const match = line.match(/^(\d+)\.\s*(.*)/);
      if (match) {
        const [_, id, name] = match;
        userData.push({ id, name, status: "absent" });
      }
    });

    readInterface.on('close', function () {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('UserSheet');

      worksheet.addRow(['ID', 'Name', 'Status']);

      userData.forEach(({ id, name, status }, index) => {
        worksheet.addRow([id, name, status]);
      });

      workbook.xlsx.writeFile('user.xlsx')
        .then(() => {
          console.log('User Excel file created successfully!');
          resolve(userData);
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  });
}

async function processLoginDat(filePath, targetDate, startTime, endTime) {
  return new Promise((resolve, reject) => {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const lines = rawData.trim().split('\n');

    const loginData = [];

    lines.forEach((line) => {
      const [id, date, time] = line.trim().split(/\s+/);
      if (date === targetDate && isTimeInRange(time, startTime, endTime)) {
        loginData.push({ id, date, time });
      }
    });

    if (loginData.length === 0) {
      console.log(`No data found for the specified date ${targetDate} and time range ${startTime} to ${endTime}`);
      resolve([]);
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('LoginSheet');

    worksheet.addRow(['ID', 'Date', 'Time']);

    loginData.forEach((data) => {
      worksheet.addRow(Object.values(data));
      console.log(data);
    });

    workbook.xlsx.writeFile(`login.xlsx`)
      .then(() => {
        console.log(`Login Excel file for ${targetDate} created successfully!`);
        resolve(loginData);
      })
      .catch((error) => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

function isTimeInRange(time, startTime, endTime) {
  return time >= startTime && time <= endTime;
}
