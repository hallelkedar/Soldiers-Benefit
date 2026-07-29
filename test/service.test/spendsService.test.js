import { it, describe } from "node:test";
import assert from "node:assert";
import createSpendsService from "../../service/spendsService.js";
import spendsMockRepo from "../../mock/spendsMockRepo.js";

const spendsService = createSpendsService(spendsMockRepo);

describe("Spends service test", () => {
  describe("createSpend test", () => {
    it("Should return the new spends and remainingAmount", async () => {});
    it("Should return failed message and remainingAmount", async () => {});
    it("Should throw error - budget not found", async () => {});
  });
  describe("getTransactions test", () => {
    it("Should return all the transactions of budgetId", async () => {});
    it("Should throw error - budget not found", async () => {});
    it("Should return empty array for budget with no attached transactions", async () => {});
  });
});
