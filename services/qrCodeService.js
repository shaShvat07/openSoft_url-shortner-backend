// services/qrCodeService.js
const qr = require('qrcode');
const fs = require('fs');

async function generateQRCode(shortUrl, filePath) {
  try {
    // Generate QR code
    const qrCode = await qr.toDataURL(shortUrl);

    // Save QR code as an image file
    await fs.promises.writeFile(filePath, qrCode);

    return filePath;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateQRCode,
};
