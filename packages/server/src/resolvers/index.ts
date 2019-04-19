import saveFile from '../utils/saveFile';

export default {
  Mutation: {
    async uploadFiles(obj: any, { files }: any) {
      try {
        // load files to fs
        const uploadedFiles = await Promise.all(
          files.map(async (uploadPromise: any) => saveFile(await uploadPromise, 'public'))
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
