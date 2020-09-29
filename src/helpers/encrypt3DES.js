const crypto = require('crypto');

function encrypt3DES(data) {
    const key = '0123456789ABCDEFFEDCBA987654321089ABCDEF01234567';
    const cipher = crypto.createCipheriv('des-ede3', key, '');

    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

module.exports = encrypt3DES;