import Router from 'express';
import { me } from './user.controllers.js';

const router = Router();

router.get('/', me);

export default router;