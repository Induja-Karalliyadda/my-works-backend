import multer from 'multer';
import path from 'path';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: './uploads', // Folder to save uploaded files
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Name the file with a unique timestamp
    },
});

// Set file filter for specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/; // Allowed file types: JPEG, PNG, and PDF
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Unsupported file format'), false); // Reject the file
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter, // Add file filter to the multer initialization
});

export default upload;
