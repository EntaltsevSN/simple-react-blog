import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
//import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import firebase from '../config/firebase'
import { getId } from '../config/functions'


function MyUploadAdapter(loader) {
  this.upload = () => loader.file.then(
    file =>
      new Promise((resolve, reject) => {
        let storage = firebase.storage().ref();
        let uploadTask = storage
          .child(getId(20))
          .put(file);
        console.log('task', uploadTask)
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            // eslint-disable-next-line default-case
            switch (error.code) {
              case "storage/unauthorized":
                reject(" User doesn't have permission to access the object");
                break;

              case "storage/canceled":
                reject("User canceled the upload");
                break;

              case "storage/unknown":
                reject(
                  "Unknown error occurred, inspect error.serverResponse"
                );
                break;
            }
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log(downloadURL)
                // console.log("File available at", downloadURL);
                resolve({
                  default: downloadURL
                });
              });
          }
        );
      })
  );
}

function Editor(props) {
  return (
    <CKEditor
      className="editor"
      editor={ClassicEditor}
      placeholder={props.placeholder}
      data={props.data}
      onInit={editor => {
        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
          return new MyUploadAdapter(loader);
        };
      }}
      onChange={(event, editor) => props.onChange(editor.getData())}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
      config={{ placeholder: props.  placeholder }}
    />
  )
}

export default Editor