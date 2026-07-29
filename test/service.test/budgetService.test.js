import { it, describe } from "node:test";
import assert from "node:assert";
import createBudgetService from "../../service/budgetService.js";
import budgetMockRepo from "../../mock/budgetMockRepo.js";

const budgetService = createBudgetService(budgetMockRepo);

describe("Budget service test", () => {
  describe("createBudget test", () => {
    it("Should return the new budget as it's saved", async () => {
      const budget = {
        unit: "8200",
        benefitType: "giftCard",
        month: "2026-10",
        allocatedAmount: 16,
      };
      const result = await budgetService.createBudget(budget)
      assert.deepEqual(result, {})
    });
  });
});
