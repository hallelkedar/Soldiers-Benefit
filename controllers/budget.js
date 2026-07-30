import { errorThrowing } from "../utils/utils.js";
import createBudgetService from "../service/budgetService.js";
import budgetRepo from "../repository/budgetRepo.js";
import spendsRepo from "../repository/spendsRepo.js";
import { budgetSchema } from "../validation/budgetSchema.js";

const budgetService = createBudgetService(budgetRepo, spendsRepo);

export default {
  postBudget: async (req, res) => {
    const { unit, benefitType, month, allocatedAmount } = req.body;

    const validation = budgetSchema.safeParse({
      unit,
      benefitType,
      month,
      allocatedAmount,
    });
    if (!validation.success) {
      errorThrowing(validation.error.issues[0].message, 400);
    }

    const budget = await budgetService.createBudget({
      unit,
      benefitType,
      month,
      allocatedAmount,
    });
    return res.status(201).json({ success: true, data: budget });
  },
  getBudgets: async (req, res) => {
    const { unit, month, benefitType } = req.query;
    const budgets = await budgetService.getBudgets({
      unit,
      month,
      benefitType,
    });
    res.json({ success: true, data: budgets });
  },
};
