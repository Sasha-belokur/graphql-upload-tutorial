import fs from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';

const save = (uploadFileStream: any, location: string): Promise<any> => {
const { createReadStream, filename, mimetype } = uploadFileStream;
const stream = createReadStream();
const id = `${shortid.generate()}-`;
const sanitizedFilename = filename.replace(/[^a-z0-9_.\-]/gi, '_').toLowerCase();
const path = `${location}/${id}${sanitizedFilename}`;

// Check if UPLOAD_DIR exists, create one if not
if (!fs.existsSync(location)) {
    mkdirp.sync(location);
}

return new Promise((resolve, reject) =>
    stream
    .on('error', async (error: Error) => {
        if (stream.truncated) {
        // Delete the truncated file
        await this.delete(path);
        }

        reject(error);
    })
    .pipe(fs.createWriteStream(path))
    .on('error', (error: Error) => reject(error))
    .on('finish', async () => {
        resolve({ path, name: filename, type: mimetype });
    })
);
}

export { save };