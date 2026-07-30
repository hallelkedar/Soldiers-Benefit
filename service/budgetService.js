import { errorThrowing, getSpentAmount } from "../utils/utils.js";

export default function createBudgetService(budgetRepo, spendsRepo) {
  return {
    createBudget: async (data) => {
      const { unit, benefitType, month, allocatedAmount } = data;
      const matchs = await budgetRepo.find(unit, benefitType, month);
      if (matchs.length !== 0) {
        errorThrowing(`Exact combination is already exists ${matchs[0].id}`, 409);
      }
      const budget = await budgetRepo.create({
        unit,
        benefitType,
        month,
        allocatedAmount,
      });
      return budget;
    },
    
    getBudgets: async (filter) => {
      const { unit, month, benefitType } = filter;
      const budgets = await budgetRepo.find(unit, benefitType, month);
      if (!budgets) return [];
      return Promise.all(
        budgets.map(async (budget) => {
          const transactions = await spendsRepo.getByBudgetId(budget.id);
          const spentAmount = getSpentAmount(transactions);
          return {
            ...budget,
            spentAmount,
            remainingAmount: budget.allocatedAmount - spentAmount,
          };
        }),
      );
    },
  };
}
