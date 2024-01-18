const multer = require('multer');
const fs = require('fs');

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};
const storageFolder = 'uploads/images';

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, storageFolder);
    },
    filename: (req, file, callback) => {
      let uploadedFileName;
      let error = null;
      const fileName = file.originalname;

      fs.stat(`${storageFolder}/${fileName}`, function (err, stat) {
        if (err == null) {
          error = new Error('File with this name already exists!');
          uploadedFileName = false;
        } else if (err.code === 'ENOENT') {
          uploadedFileName = fileName;
        } else {
          error = new Error(err.message);
          uploadedFileName = false;
        }
        callback(error, uploadedFileName);
      });
    },
    fileFilter: (req, file, callback) => {
      const isValid = !!MIME_TYPE[file.mimetype];
      let error = isValid ? null : new Error('Invalid mime type!');
      callback(error, isValid);
    },
  }),
});

module.exports = fileUpload;
