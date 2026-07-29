import { errorThrowing } from "../utils/utils.js";
import { benefitValidation } from "../utils/validation.js";

export default function createBudgetService(repo) {
  return {
    createBudget: async (data) => {
      const { unit, benefitType, month, allocatedAmount } = data;
      const match = await repo.find(unit, benefitType, month)
      if (match) {
        errorThrowing(`Exact combination is already exists ${match.id}`, 409)
      }
      const budget = await repo.create({
        unit,
        benefitType,
        month,
        allocatedAmount,
      });
    },
    getBudgets: async (filter) => {
        const budgets = await repo.find(...filter)
        return budgets.map(budget => {
            const spentAmount = ''// TODO Calculate all it's transactions (spends)
            return {
                ...budget,
                spentAmount, 
                remainingAmount: budget.allocatedAmount - spentAmount
            }
    })
        }

    }
  };
