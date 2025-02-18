import express from 'express';
const router = express.Router();
import siteController from '../app/controllers/SiteController.js';

router.use('/', siteController.index);

export default router;