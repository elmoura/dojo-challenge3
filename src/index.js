const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');

const FtpService = require('./services/ftp.service');

const csvToJson = require('./helpers/csvToJson');
const encryptTo3DES = require('./helpers/encrypt3DES');

const tempFolder = path.resolve(__dirname, '..', 'temp');

schedule.scheduleJob('10 * * * * *', async function () {
    const ftpService = new FtpService();

    const files = await ftpService.listFiles('/docs');
    console.log(files);

    for (const file of files) {
        console.log(JSON.parse(file));
        const [validationFileName] = file.name.split('.');
        const validationFilePath = path.join(tempFolder, `${validationFileName}.txt`);

        const isFileCreated = fs.exists(validationFilePath, (exists) => exists);

        if (!isFileCreated) {
            const filePath = path.join(tempFolder, file.name);
            const downloadPath = `/docs/${file.name}`

            await ftpService.downloadFile(filePath, downloadPath);

            const file = require(filePath);
            const jsonFile = csvToJson(file);

            const encryptedFile = encryptTo3DES(jsonFile);
            fs.writeFileSync(validationFilePath, encryptedFile);

            fs.unlink(filePath, (error) => {
                if (error) {
                    throw error;
                }

                console.log('Original file deleted successfully');
            });
        }
    }

});
