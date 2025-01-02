import {Router} from 'express'
const router=Router();
import {register,login,logout,getUsers} from '../controllers/authController.js';
import { validateRegisterInput,validateLoginInput } from '../middleware/validationMiddleware.js';

router.get('/users',getUsers);
router.post('/register',validateRegisterInput,register);
router.post('/login',validateLoginInput,login);
router.get('/logout',logout);

export default router;