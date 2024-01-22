import processLoginDat from "./processLoginDat.js";
import readExcel from "./readFile.js";
import sendSMS from "./sendSMS.js";

async function compareData(loginFilePath, targetDate, startTime, endTime) {
  const userFilePath = 'user.xlsx';

  try {
    const userWorkbook = await readExcel(userFilePath);
    const loginWorkbook = await processLoginDat(loginFilePath, targetDate, startTime, endTime);

    const userWorksheet = userWorkbook.getWorksheet('UserSheet');
    const loginWorksheet = loginWorkbook.getWorksheet('LoginSheet');

    const userData = [];
    const smsMessages = [];

    userWorksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
      if (rowNumber > 1) {
        const userId = row.values[1];
        const userName = row.values[2];
        const status = findStatus(userId, loginWorksheet);
        userData.push({ id: userId, name: userName, status });
        userWorksheet.getCell(`C${rowNumber}`).value = status;

        if (status === 'absent') {
          const userPhoneNumber = row.getCell(4).value;
          const smsMessage = `Dear ${userName}, you were absent on ${targetDate}. Please check your attendance.`;
          smsMessages.push({ userPhoneNumber, smsMessage });
        }
      }
    });

    await userWorkbook.xlsx.writeFile('user_uped.xlsx');

    // Send SMS messages with a delay
    for (const { userPhoneNumber, smsMessage } of smsMessages) {
      await sendSMSWithDelay(userPhoneNumber, smsMessage, 1500); // 1500 milliseconds (1.5 second) delay
    }

    const responseData = {
      data: userData,
      message: 'Comparison data retrieved successfully',
    };

    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function findStatus(userId, loginWorksheet) {
  let status = 'absent';

  loginWorksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1) {
      const loginId = row.values[1];
      if (loginId === userId) {
        status = 'present';
      }
    }
  });

  return status;
}

async function sendSMSWithDelay(userPhoneNumber, smsMessage, delay) {
  // Use setTimeout to introduce a delay before sending each SMS
  return new Promise(resolve => {
    setTimeout(async () => {  
      await sendSMS(userPhoneNumber, smsMessage);
      resolve();
    }, delay);
  });
}

export default compareData;