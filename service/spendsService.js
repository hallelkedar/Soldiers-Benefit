import { errorThrowing, getSpentAmount } from "../utils/utils.js"

export default function createSpendsService (spendsRepo, budgetRepo) {
    return {
        getTransactions: async (budgetId) => {
            if (!await budgetRepo.getById(budgetId)) {
                errorThrowing(`Budget not found`, 404)
            }
            const transactions = await spendsRepo.getByBudgetId(budgetId)
            return transactions

        },
        createSpend: async (budgetId, amount, reason=null) => {
            const budget = await budgetRepo.getById(budgetId)
            if (!budget) {
                errorThrowing(`Budget not found`, 404)
            }
            const transactions = await spendsRepo.getByBudgetId(budgetId)
            const spentAmount = getSpentAmount(transaction)
            const remainingAmount = budget.allocatedAmount - spentAmount
            if (spentAmount + amount > budget.allocatedAmount) {
                return {error: 'Amount is more than allowed', remainingAmount}
            }
            
            const data = reason ? {budgetId, amount, reason} : {budgetId, amount}
            const transaction = await spendsRepo.create(data)
            return {transaction, remainingAmount: remainingAmount + amount}
        },
    }
}