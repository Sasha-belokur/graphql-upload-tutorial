import { gql } from 'apollo-boost';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import Dropzone from 'react-dropzone';

const dropzoneStyle = {
  width: 200,
  height: 250,
  border: '3px dashed #000000',
  textAlign: 'center'
};

const UPLOAD_FILES = gql`
  mutation uploadFiles($files: [Upload]!) {
    uploadFiles(files: $files) {
      name
      path
      type
    }
  }
`

const App = () => {
  return (
    <Mutation mutation={UPLOAD_FILES}>
      {uploadFiles => (
        <Dropzone onDrop={async files => {
          const { data : { uploadFiles: uploads }} = await uploadFiles({ variables: { files } });
          console.log(uploads);
        }}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section>
              <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <p>{isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}</p>
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </Mutation>
  )
};

export default App;
