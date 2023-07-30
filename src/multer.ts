import{ diskStorage } from 'multer';
import * as multer from 'multer';

export const fileStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    let extension = file.originalname;
    console.log('extension', extension);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    console.log('uniqueSuffix', uniqueSuffix);
    cb(null, uniqueSuffix + extension);
  },
});

export function MulterFileFilter (req, file, cb){
  console.log(file)
  if (file.fieldname == 'userImage' ) {
    if (
      file.mimetype.includes('image/jpeg') ||
      file.mimetype.includes('image/png')
    ) {
      cb(null, true);
    } else {
      cb("unrecognised file type", false);
    }
  } else {
    cb(null, false);
  }
};


// diskStorage({
//   destination: './uploads'
//   , filename: (req, file, cb) => {
//     // Generating a 32 random chars long string
//     const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
//     //Calling the callback passing the random name generated with the original extension name
//     cb(null, `${randomName}${extname(file.originalname)}`)
//   }
// }),