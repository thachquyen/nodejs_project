import express from 'express';
import multer from 'multer';
const router = express.Router();
import siteController from '../app/controllers/SiteController.js';
import path from 'path';

const storage = multer.diskStorage({
    destination: "src/public/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage: storage });

router.get('/create', siteController.create);
router.post('/store', upload.single("image"), siteController.store);
router.get('/:slug', siteController.show);
router.get('/cat/edit/:id', siteController.edit);
router.put('/cat/:id', siteController.update);
router.delete('/cat/:id', siteController.delete);
router.post('/cat/delete-multiple', siteController.deleteAll);
router.get('/cat/list', siteController.list);
router.get('/', siteController.index);

export default router;