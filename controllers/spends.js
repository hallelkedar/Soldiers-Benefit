import { errorThrowing } from "../utils/utils.js";
import createSpendsService from "../service/spendsService.js";
import spendsRepo from "../repository/spendsRepo.js";
import budgetRepo from "../repository/budgetRepo.js";

const spendsService = createSpendsService(spendsRepo, budgetRepo)

export default {
    getTransactions: async (req, res) => {
        const budgetId = req.params.id
        const transactions = await spendsService.getTransactions(budgetId)
        return res.json({success: true, data: transactions})
    },
    createSpend: async (req, res) => {
        const budgetId = req.params.id
        const {amount, reason} = req.body
        if (!amount) {
            errorThrowing('amount is require field', 400)
        }
        const result = await spendsService.createSpend(budgetId, {amount, reason})
        if (result.error) {
            return res.status(400).json(result)
        }
        return res.status(201).json({success: true, data: result})
    }
}