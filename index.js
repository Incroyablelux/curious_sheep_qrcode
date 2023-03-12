const qr = require('qrcode');
const slugify = require('slugify');
const fs = require('fs');

// Récupère l'URL passée en argument de ligne de commande
const url = process.argv[2];

// Vérifie que l'URL a bien été passée en argument
if (!url) {
    console.error('Veuillez spécifier une URL');
    process.exit(1);
}

// Slugifie l'URL pour obtenir le nom du fichier
const filename = slugify(url) + '.png';

// Génère le QR code correspondant à l'URL
qr.toFile(filename, url, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Le fichier ${filename} a été créé.`);
});
