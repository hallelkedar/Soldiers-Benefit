import { it, describe, mock } from "node:test";
import assert from "node:assert";
import createBenefitService from "../../service/benefitsService.js";

describe("Benefits service test", () => {
  describe("createBenefit test", () => {
    it("Should throw a error - soldier is already regist", async () => {
      const service = createBenefitService({
        find: mock.fn((filter) => {
          soldierId: 1;
        }),
      });
      assert.rejects(async () => {
        await service.createBenefit(1, {
          unit: "8200",
        });
      }, "Soldier is already exists.");
    });
    it("Should return the correct new benefit", async () => {
      const time = new Date();
      const benefit = {
        id: 1,
        soldierId: 12,
        unit: "8200",
        currentBenefitType: "giftCard",
        history: [
          {
            startDate: time,
            endDate: null,
            decisionReason: "n",
            budgetApproved: true,
            benefitType: "giftCard",
            details: {
              cardProvider: "goodi",
              monthlyValue: 2,
              validMerchants: ["a", "b", "c"],
            },
          },
        ],
      };
      const service = createBenefitService({
        find: mock.fn((filter) => {
          if (filter.soldierId === 123) return false;
          return benefit;
        }),
        create: mock.fn((data) => 1),
      });
      const result = await service.createBenefit(123, {
        unit: "8200",
        benefitType: "giftCard",
        details: {
          cardProvider: "goodi",
          monthlyValue: 2,
          validMerchants: ["a", "b", "c"],
        },
        decisionReason: "n",
        budgetApproved: true,
      });
      assert.deepStrictEqual(result, false);
    });
  });
  describe("getBenefitById test", () => {
    it("Should throw an error - benefit for that soldier is not exists", () => {
      const service = createBenefitService({
        find: mock.fn((soldierId) => null),
      });

      assert.rejects(async () => {
        const result = await service.getBenefitById(123);
      }, "Walfare record for soldierId (123) not found");
    });
    it("Should return the benefit seccuessfully.", async () => {
      const service = createBenefitService({
        find: mock.fn((id) => {
          return {data: "bla"}
        }),
      });
      const result = await service.getBenefitById(1);
      assert.deepEqual(result, { data: "bla" });
    });
  });
  describe("addBenefit test", () => {
    it("Should throw a error - soldier is not regist", () => {
      const service = createBenefitService({
        find: mock.fn((id) => null),
      });
      assert.rejects(async () => {
        const result = await service.addBenefit(1);
      }, "Walfare record for soldierId (1) not found");
    });
    it("Should return reverted: true, beacuse of the rule in decisionDate (date 1)", async () => {
      const service = createBenefitService({ find: mock.fn((id) => true) });
      const result = await service.addBenefit(1, {
        decisionDate: "2022-01-01",
      });
      assert.deepEqual(result, {
        reverted: true,
        reason: "Minister of finance is a bit despondent",
      });
    });
    it("Should return reverted: true, beacuse of the rule in decisionDate (claculate dates)", async () => {
      const service = createBenefitService({ find: mock.fn((id) => true) });
      const result = await service.addBenefit(1, 
        {decisionDate: '2000-09-01'}
      );
      assert.deepEqual(result, {
        reverted: true,
        reason: "Minister of finance is a bit despondent",
      });
    });
    it("Should return that reverted is false, update successfully.", async () => {
      const service = createBenefitService({
        find: mock.fn((id) => {
          return {
            id: 1,
            soldierId: 12,
            unit: "8200",
            currentBenefitType: "giftCard",
            history: [
              {
                startDate: "",
                endDate: null,
                decisionReason: "n",
                budgetApproved: true,
                benefitType: "giftCard",
                details: {
                  cardProvider: "goodi",
                  monthlyValue: 2,
                  validMerchants: ["a", "b", "c"],
                },
              },
            ],
          };
        }),
        update: mock.fn((id, benefit) => true),
      });
      const result = await service.addBenefit(1, {});
      assert.deepEqual(result, {
        reverted: false,
        reason: "",
      });
    });
  });
});
