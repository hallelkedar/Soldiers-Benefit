import express from 'express';
import budget from '../controllers/budget.js';
import spends from '../controllers/spends.js';

const router = express.Router()

router.post('/', budget.postBudget)
router.get('/', budget.getBudgets)

router.get('/:id/transactions', spends.getTransactions)
router.post('/:id/transactions', spends.createSpend)

export default router