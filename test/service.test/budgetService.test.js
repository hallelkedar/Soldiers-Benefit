import { it, describe, mock } from "node:test";
import assert from "node:assert";
import createBudgetService from "../../service/budgetService.js";

describe("Budget service test", () => {
  describe("createBudget test", () => {
    it("Should return the new budget as it's saved", async () => {
      const service = createBudgetService(
        {
          find: mock.fn((id) => null),
          create: mock.fn((data) => {
            return {};
          }),
        },
        {},
      );
      const result = await service.createBudget({});
      assert.ok(result);
    });
    it("Should throw error because unit+benefitType+month is already exists", async () => {
      const service = createBudgetService(
        {
          find: mock.fn((id) => {
            id: 1;
          }),
        },
        {},
      );
    });
    assert.rejects(async () => {
      await service.createBudget({});
    }, "Exact combination is already exists 1");
  });
  describe("getBudgets test", () => {
    it("Should return array of budget with that unit", async () => {
      const service = createBudgetService(
        {
          find: mock.fn((unit, benefitType, month) => {
            return [
              { id: 1, remainingAmount: 1 },
              { id: 2, remainingAmount: 1 },
              { id: 3, remainingAmount: 1 },
            ];
          }),
        },
        {
          getByBudgetId: mock.fn((id) => {
            return [{ amount: 12 }, { amount: 13 }, { amount: 1 }];
          }),
        },
      );
      const result = await service.getBudgets({});
      assert.deepEqual(result, [
        { id: 1, spentAmount: 26, remainingAmount: 0 },
        { id: 2, spentAmount: 26, remainingAmount: 0 },
        { id: 3, spentAmount: 26, remainingAmount: 0 }
      ]);
    });
  });
});
