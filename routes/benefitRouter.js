import express from 'express';
import benefits from '../controllers/benefits.js';

const router = express.Router()

router.post('/', benefits.postSoldierBenefit)
router.get('/', benefits.getSoldierBenefit)
router.patch('/', benefits.updateSoldierBenefit)

export default router