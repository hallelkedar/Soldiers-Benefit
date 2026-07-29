import { errorThrowing } from "../utils/utils.js";
import createBudgetService from "../service/budgetService.js";
import budgetRepo from "../repository/budgetRepo.js";

const budgetService = createBudgetService(budgetRepo);

export default {
  postBudget: async (req, res) => {
    const { unit, benefitType, month, allocatedAmount } = req.body;
    if (!unit || !benefitType || !month || !allocatedAmount) {
      errorThrowing("Requierd fields are missing.", 400);
    }
    if (benefitType !== "giftCard" || "diningHall") {
      errorThrowing("benefitType has to be giftCard or diningHall", 400);
    }
    if (isNaN(Number(allocatedAmount))) {
      errorThrowing("allocatedAmount has to be a number.", 400);
    }
    if (
      !month.length === 7 ||
      month[5] !== "-" ||
      isNaN(Number(month.slice(0, 5))) ||
      isNaN(Number(month.slice(5)))
    ) {
      errorThrowing("Month has to be in YYYY-MM format.", 400);
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
