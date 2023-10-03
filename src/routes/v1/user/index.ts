import express from 'express';
const router = express.Router();
import uploadRoute from '../user/upload.route';
import isAuth from '../../../middleware/is_auth.middleware';

router.use(isAuth);
router.use('/upload', uploadRoute);

export default router;
