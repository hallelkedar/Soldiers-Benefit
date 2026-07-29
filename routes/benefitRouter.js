import express from 'express';
import soldiers from '../controllers/soldiers';

const router = express.Router()

router.post('/', soldiers.postSoldierBenefit)
router.get('/', soldiers.getSoldierBenefit)
router.patch('/', soldiers.updateSoldierBenefit)

export default router