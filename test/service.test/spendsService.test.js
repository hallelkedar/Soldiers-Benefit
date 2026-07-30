import { it, describe, mock } from "node:test";
import assert from "node:assert";
import createSpendsService from "../../service/spendsService.js";

describe("Spends service test", () => {
  describe("createSpend test", () => {
    it("Should return the new spends and remainingAmount", async () => {
      const service = createSpendsService({}, {});
    });
    it("Should return failed message and remainingAmount", async () => {
      const service = createSpendsService(
        {
          findById: mock.fn((id) => {
            allocatedAmount: 26;
          }),
        },
        {
          getByBudgetId: mock.fn((id) => {
            return [{ amount: 12 }, { amount: 13 }, { amount: 1 }];
          }),
        },
      );
      const result = await service.createSpend(1, 27);
      assert.strictEqual(result.error, "Amount is more than allowed");
    });

    it("Should throw error - budget not found", async () => {
      const service = createSpendsService(
        {
          findById: mock.fn((id) => null),
        },
        {},
      );
      assert.rejects(async () => {
        await service.createSpend(1, 1);
      }, "Budget not found");
    });
  });
  describe("getTransactions test", () => {
    it("Should throw error - budget not found", async () => {
      const service = createSpendsService({}, {findById: mock.fn(id => null)})
      assert.rejects(async () => {
        await service.getTransactions(1)
      }, 'Budget not found')
    });
    it("Should return empty array for budget with no attached transactions", async () => {
      const service = createSpendsService({
        getByBudgetId: mock.fn(id => [])
      }, {
        findById: mock.fn(id => true)
      })
      const result = await service.getTransactions(1)
      assert.deepEqual(result, [])
    });
  });
});
