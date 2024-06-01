import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if (file.fieldname === 'profile') {
          cb(null, 'src/public/profiles/');
      } else if (file.fieldname === 'product') {
          cb(null, 'src/public/products/');
      } else{
          cb(null, 'src/public/documents/');
      }
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
    storage: storage
});

export default upload;