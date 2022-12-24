const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.baseUrl.split("/")[2]
    cb(null, path.join(path.dirname(__dirname), `uploads/${folderName}`));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.upload = multer({ storage });