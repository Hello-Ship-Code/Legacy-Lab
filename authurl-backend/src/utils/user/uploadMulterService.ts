// import fs from "fs";
import multer from 'multer'

import { uploadsPath } from '../../index'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsPath)
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

export const upload = multer({ storage })