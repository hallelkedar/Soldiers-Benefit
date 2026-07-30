import { it, describe, mock } from "node:test";
import assert from "node:assert";
import benefits from "../../controllers/benefits.js";

describe("postSoldierBenefit endpoint check", () => {
    it("should throw error - benefitType is not allowed", () => {
        assert.rejects(() => {
            benefits.postSoldierBenefit({
                params: {soldierId: 1},
                benefitType: "aaa"
            }, {})
        }, '')
    })
})