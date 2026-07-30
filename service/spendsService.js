import { errorThrowing, getSpentAmount } from "../utils/utils.js";

export default function createSpendsService(spendsRepo, budgetRepo) {
  return {
    getTransactions: async (budgetId) => {
      if (!(await budgetRepo.findById(budgetId))) {
        errorThrowing(`Budget not found`, 404);
      }
      const transactions = await spendsRepo.getByBudgetId(budgetId);
      return transactions;
    },
    createSpend: async (budgetId, amount, reason = null) => {
      const budgets = await budgetRepo.findById(budgetId);
      if (!budgets || budgets.length === 0) {
        errorThrowing(`Budget not found`, 404);
      }
      const transactions = await spendsRepo.getByBudgetId(budgetId);
      const spentAmount = getSpentAmount(transactions);
      const remainingAmount = budgets[0].allocatedAmount - spentAmount;

      if (spentAmount + amount > budgets[0].allocatedAmount) {
        return { error: "Amount is more than allowed", remainingAmount};
      }
      

      const data = reason ? { budgetId, amount, reason } : { budgetId, amount };
      const transaction = await spendsRepo.create(data);
      return { transaction, remainingAmount: remainingAmount + Number(amount) };
    },
  };
}
