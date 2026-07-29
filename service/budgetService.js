import { errorThrowing } from "../utils/utils.js";
import { benefitValidation } from "../utils/validation.js";

export default function createBudgetService(repo) {
  return {
    createBudget: async (data) => {
      const { unit, benefitType, month, allocatedAmount } = data;
    },

  };
}
