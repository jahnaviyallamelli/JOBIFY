import {Router} from 'express';
import {getAllJobs,getJob,updateJob,createJob,deleteJob, showStats} from '../controllers/jobController.js'
import { validateIdParams, validateJobInput } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router=Router();

router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);
router.route('/stats').get(showStats);
router.route('/:id').get(validateIdParams,getJob).patch(checkForTestUser,validateIdParams,updateJob).delete(checkForTestUser,validateIdParams,deleteJob);

export default router;
