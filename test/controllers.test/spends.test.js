import { it, describe, mock } from "node:test";
import assert from "node:assert";
import spends from "../../controllers/spends.js";

describe("spends controller check", () => {
  describe("createSpend endpoint test", () => {
    it("Should throw error - amount is not a number", () => {
      assert.rejects(() => {
        spends.createSpend({ body: { amount: "d" } }, {});
      }, "amount has to be a number");
    });
  });
});
