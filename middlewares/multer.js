import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuid } from "uuid";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const extName = file.originalname.split(".").pop();
    cb(null, `${uuid()}.${extName}`);
  },
});

export const uploadFiles = multer({ storage }).single("thumbnail");
