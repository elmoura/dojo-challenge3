const ftp = require('basic-ftp');

class FtpService {
    async listFiles(path) {
        const client = new ftp.Client();

        try {
            client.ftp.verbose = true;

            await client.access({
                user: "kapi",
                password: "senhatopdelinha",
                host: "64.31.33.10",
                port: 21,
                secure: false
            });

            const files = await client.list(path);

            return files;
        }
        catch (err) {
            console.log(err.message || err);
        }
        finally {
            client.close();
        }
    }

    async downloadFile(filePath, downloadFile) {
        const client = new ftp.Client();

        try {
            client.ftp.verbose = true;

            await client.access({
                user: "kapi",
                password: "senhatopdelinha",
                host: "64.31.33.10",
                port: 21,
                secure: false
            });

            await client.downloadTo(filePath, downloadFile)

            return files;
        }
        catch (err) {
            console.log(err.message || err);
        }
        finally {
            client.close();
        }

    }
}

module.exports = FtpService;