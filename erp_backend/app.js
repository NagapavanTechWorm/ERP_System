import TeleSignSDK from 'telesignsdk';

const customerId = "5D7713CF-0FDD-41F6-A61A-577ED759833D"
const apiKey = "uW/qtpIfKfLTVfNBFnrocubyVvqQs4DVG2ZkE3VHLA4ID3mTazTTvNubl9GmSnLOKmbUkVQyWe2LKw5ixWlFug=="
const phoneNumber = "7892726198"
const message = "Your package has shipped! Follow your delivery";
const messageType = "ARN";
let response = {};

const client = new TeleSignSDK( customerId, apiKey);

function smsCallback(error, responseBody) {
    response = responseBody;
}

client.sms.message(smsCallback, phoneNumber, message, messageType);