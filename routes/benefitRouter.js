import express from 'express';
import soldiers from '../controllers/benefits';

const router = express.Router()

router.post('/', soldiers.postSoldierBenefit)
router.get('/', soldiers.getSoldierBenefit)
router.patch('/', soldiers.updateSoldierBenefit)

export default router