import { it, describe, mock } from "node:test";
import assert from "node:assert";
import benefits from "../../controllers/benefits.js";

describe("postSoldierBenefit endpoint check", () => {
  it("should throw error - benefitType is not allowed", () => {
    assert.rejects(() => {
      benefits.postSoldierBenefit(
        {
          body: {
            params: { soldierId: 1 },
            benefitType: "aaa",
          },
        },
        {},
      );
    }, "");
  });
  describe("updateSoldierBenefit endpoint test", () => {
    it("Should throw error - decisionDate is not valid", () => {
      assert.rejects(async () => {
        benefits.updateSoldierBenefit(
          {
            body: {
              decisionDate: "nsns",
            },
          },
          {},
        );
      }, "Invalid ISO date");
    });
  });
});
