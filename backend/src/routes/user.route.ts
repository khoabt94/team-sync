import { authenticatedGuard } from '@/auth';
import { userControllers } from '@/user';
import { Router } from 'express';

// '/user'
const userRoutes = Router();

userRoutes.use(authenticatedGuard);
userRoutes.get('/current', userControllers.getCurrentUser);

export { userRoutes };
