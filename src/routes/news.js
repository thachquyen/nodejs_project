import express from 'express';
const router = express.Router();
import newsController from '../app/controllers/newsController.js';

router.use('/:dt', newsController.show);
router.use('/', newsController.index);

export default router;