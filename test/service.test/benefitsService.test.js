import { it, describe } from "node:test";
import assert from "node:assert";
import createBenefitService from "../../service/benefitsService.js";
import benefitsMockRepo from "../../mock/benefitsMockRepo.js";

const benefitService = createBenefitService(benefitsMockRepo);

describe("Benefits service test", () => {
  describe("createBenefit test", () => {
    it("Should return the new benefit as it's saved", async () => {
      const date = new Date().toDateString();
      const benefit = {
        unit: "8200",
        benefitType: "giftCard",
        startDate: date,
        details: {
          cardProvider: "Goodi",
          monthlyValue: 15,
          validMerchants: [
            "The jewish resterount",
            "Shalom falafel",
            "Shawarma betzalel",
          ],
        },
        decisionReason: "The soldier was doing great work.",
        budgetApproved: true,
      };
      const result = await benefitService.createBenefit(2, benefit);
      assert.deepEqual(result, {
        id: 1,
        soldierId: 2,
        unit: "8200",
        currentBenefitType: "giftCard",
        history: [
          {
            startDate: date,
            endDate: null,
            decisionReason: "The soldier was doing great work.",
            budgetApproved: true,
            benefitType: "giftCard",
            details: {
              cardProvider: "Goodi",
              monthlyValue: 15,
              validMerchants: [
                "The jewish resterount",
                "Shalom falafel",
                "Shawarma betzalel",
              ],
            },
          },
        ],
      });
    });
  });
});
