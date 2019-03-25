import { save } from './fileStorage';

export default {
  Mutation: {
    async uploadFiles(obj: any, { files }: any) {
      try {
        // load files to fs
        const uploadedFiles = await Promise.all(
          files.map(async (uploadPromise: any) => save(await uploadPromise, 'public'))
        );
        // return filename and path to file
        return uploadedFiles;
      } catch (e) {
        console.log('error', e);
        throw new Error('upload:fileNotLoaded');
      }
    }
  }
};
