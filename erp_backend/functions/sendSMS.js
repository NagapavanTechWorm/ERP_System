import TeleSignSDK from 'telesignsdk';

async function sendSMS(userPhoneNumber, smsMessage){


// Replace the defaults below with your Telesign authentication credentials or pull them from environment variables.
const customerId = process.env.CUSTOMER_ID;
const apiKey = process.env.API_KEY ;

// Set the default below to your test phone number or pull it from an environment variable. 
// In your production code, update the phone number dynamically for each transaction.
const phoneNumber = "91"+userPhoneNumber;

// Set the message text and type.   
const message = smsMessage;
const messageType = "ARN";

// Instantiate a messaging client object.
const client = new TeleSignSDK( customerId, apiKey);

// Define the callback.
function smsCallback(error, responseBody) {
    // Display the response body in the console for debugging purposes. 
    // In your production code, you would likely remove this.
    if (error === null) {
        console.log("\nResponse body:\n" + JSON.stringify(responseBody));
    } else {
        console.error("Unable to send SMS. Error:\n\n" + error);
    }
}

// Make the request and capture the response.
client.sms.message(smsCallback, phoneNumber, message, messageType);
}

export default sendSMS;