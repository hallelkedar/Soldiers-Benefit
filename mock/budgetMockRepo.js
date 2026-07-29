import { mock } from "node:test";

const budgets = [
    {
        id: 1,
        unit: "8200",
        budgetType: "giftCard",
        month: "2026-04",
        allocatedAmount: 44
    }
]

export default {
    create: mock.fn(async (data) => {
        const existingIds = budgets.map(budget => budget.id)
        const newId = Math.max(1, ...existingIds) + 1
        const budget = {newId, ...data}
        budgets.push(budget)
        return budget
    }),
    findById: mock.fn(async (id) => {
        const budget = budgets.find(budget => budget.id === id)
        return budget || null;
    }),
    // find: mock.fn(async (unit = null, benefitType = null, month = null) => {
    //     let result = [...budgets]
    //     if (unit) {

    //     }
    //     const budget = budgets.find(budget => budget.id === )
    // })
}