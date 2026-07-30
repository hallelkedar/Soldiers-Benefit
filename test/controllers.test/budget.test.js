import { it, describe, mock } from "node:test";
import assert from "node:assert";
import budget from "../../controllers/budget.js";

describe("budget controllers check", () => {
    describe("postBudget endpoint test", () => {
        it("Should throw error - month is not valid", () => {
            assert.rejects(() => {
                budget.postBudget({body: {month: 'nnn'}}, {})
            }, 'month must be in YYYY-MM format.')
        })
    })
})