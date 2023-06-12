import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dirPath = path.join(__dirname, "../../public/image_product")

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, dirPath)
    },

    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
        )
    },
})

const filefilter = (req, file, cb) => {

    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
export default multer({ storage: storage, fileFilter: filefilter });

