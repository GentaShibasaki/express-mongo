const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dateFormat = require("../utils/dateFormat");

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL + process.env.MONGODB_NAME,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const date = new Date();

    return {
      bucketName: process.env.MONGODB_IMAGE_BUCKET_NAME,
      filename: `${dateFormat()}${file.originalname}`,
      metadata: {
        // Since mongodb's default timezone is UTC, need to add metadata to save actual timezone and update date
        timeZone: process.env.TZ,
        uoloadDate: date.toString(),
      },
    };
  },
});

const storeFunction = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 20 }, // Up to 20MB
  // Should be pdf file
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      req.fileValidationError = "You must select a pdf file";
      return cb(null, false, new Error("attahced files are not pdf"));
    }
    cb(null, true);
  },
}).array("documents", 5); // Also, up to 5 files users can upload

//Let's make this function as promise function, to enable await syntax at controllers
const storeDocuments = util.promisify(storeFunction);
module.exports = storeDocuments;
