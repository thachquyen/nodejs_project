import express from 'express';
const router = express.Router();
import newsController from '../app/controllers/newsController.js';

router.get('/:dt', newsController.show);
router.get('/', newsController.index);

export default router;