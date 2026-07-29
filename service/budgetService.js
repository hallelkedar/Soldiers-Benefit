import { errorThrowing, getSpentAmount } from "../utils/utils.js";
import { benefitValidation } from "../utils/validation.js";

export default function createBudgetService(budgetRepo, spendsRepo) {
  return {
    createBudget: async (data) => {
      const { unit, benefitType, month, allocatedAmount } = data;
      const match = await budgetRepo.find(unit, benefitType, month);
      if (match) {
        errorThrowing(`Exact combination is already exists ${match.id}`, 409);
      }
      const budget = await budgetRepo.create({
        unit,
        benefitType,
        month,
        allocatedAmount,
      });
    },
    getBudgets: async (filter) => {
      const budgets = await budgetRepo.find(...filter);
      return budgets.map(async (budget) => {
        const transactions = await spendsRepo.getByBudgetId(budgetId);
        const spentAmount = getSpentAmount(transaction);
        return {
          ...budget,
          spentAmount,
          remainingAmount: budget.allocatedAmount - spentAmount,
        };
      });
    },
  };
}
