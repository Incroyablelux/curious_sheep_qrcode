const fs = require('fs');
const path = require('path');
const qr = require('qrcode');
const vCard = require('vcards-js');

const args = process.argv.slice(2);  // récupère les arguments de la ligne de commande
const filePath = args[0];  // le premier argument est le chemin du fichier de contact

const contact = require(filePath);

const card = vCard();

card.firstName = contact.firstName;
card.lastName = contact.lastName;
card.organization = contact.organization;
card.title = contact.title;
card.workEmail = contact.workEmail;
card.workPhone = contact.workPhone;
card.workAddress.street = contact.workAddressStreet
card.workAddress.postalCode = contact.workAddressPostalCode
card.workAddress.city = contact.workAddressCity
card.workAddress.countryRegion = contact.workAddressCountryRegion

const vcardString = card.getFormattedString();

const fileName = `${contact.firstName}_${contact.lastName}.png`;
const outputPath = path.join(__dirname, fileName);  // chemin de sortie pour le fichier QR code

qr.toFile(outputPath, vcardString, {
    color: {
        dark: '#000000FF',  // couleur de premier plan : noir opaque
        light: '#00000000'  // couleur d'arrière-plan : transparent
    },
    errorCorrectionLevel: 'H'
}, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`QR code saved successfully at ${outputPath}`);
});
