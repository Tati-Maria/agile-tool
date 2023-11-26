import { Router } from 'express';
import { protect, adminRoute } from '../middlewares/auth';

import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  forgotPassword,
} from '../controllers/user/auth-controller';

import {
  getUserProfile,
  getUsers,
  deleteUserAccount,
} from '../controllers/user/get-user-controller';

const router = Router();

router.route('/').get(protect, adminRoute, getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserAccount);

export default router;
