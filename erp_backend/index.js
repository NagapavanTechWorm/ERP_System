import express from "express";
import processAllUserData from "./functions/processAllUserData.js"
import compareData from "./functions/compareData.js";
import { config } from 'dotenv';
import CORSMiddleware from "./functions/Cors.js";
import axios from 'axios';

config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(CORSMiddleware);

app.get("/user", async (req, res) => {
  const userFilePath = 'user.xlsx';

  try {
    const userData = await processAllUserData(userFilePath);
    res.json(userData);
  } catch (err) {
    console.error('Error processing user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/login-sms", async (req, res) => {
  const loginFilePath = './data/DailyAttendanceLogsDetails.csv';
  const targetDate = '2024-01-22';
  const startTime = '00:00';
  const endTime = '01:00';

  try {
    const comparisonData = await compareData(loginFilePath, targetDate, startTime, endTime);
    res.json(comparisonData.data);
  } catch (err) {
    console.error('Error processing login data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.get("/login-sms", async (req, res) => {
//   const loginFilePath = './data/login.dat';

//   // Get the current date and format it as "DD-MM-YYYY"
//   const currentDate = new Date();
//   const day = String(currentDate.getDate()).padStart(2, '0');
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
//   const year = currentDate.getFullYear();
//   const targetDate = `${day}-${month}-${year}`;

//   const startTime = '20:00';
//   const endTime = '22:00';

//   try {
//     const comparisonData = await compareData(loginFilePath, targetDate, startTime, endTime);
//     res.json(comparisonData.data);
//   } catch (err) {
//     console.error('Error processing login data:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// New route for initial request
app.get("/initialize-server", async (req, res) => {
  try {
    // Make a request to /login-sms endpoint
    const response = await axios.get("http://localhost:3000/login-sms");
    res.json(response.data);
  } catch (err) {
    console.error('Error initializing server:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server on PORT ${PORT}`);
  
  // Automatically call /initialize-server when the server starts
  try {
    const response = await axios.get("http://localhost:3000/initialize-server");
    console.log("Initialization response:", response.data);
  } catch (err) {
    console.error('Error during server initialization:', err);
  }
});
