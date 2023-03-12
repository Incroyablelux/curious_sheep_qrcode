const fs = require('fs');
const qr = require('qrcode');
const vCard = require('vcards-js');

const contact = require('./contact.json');

const card = vCard();

card.firstName = contact.firstName;
card.lastName = contact.lastName;
card.organization = contact.organization;
card.title = contact.title;
card.email = contact.email;
card.workPhone = contact.workPhone;
card.workAddress.label = contact.workAddress;

const vcardString = card.getFormattedString();

qr.toFile(`${contact.firstName}_${contact.lastName}.png`, vcardString, {
    errorCorrectionLevel: 'H'
}, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('QR code saved successfully');
});
