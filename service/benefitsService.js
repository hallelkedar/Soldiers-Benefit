import benefitsRepo from "../repository/benefitsRepo.js";
import { errorThrowing } from "../utils/utils.js";

export default function createBenefitService(repo) {
  return {
    createBenefit: async (data) => {
      const {
        soldierId,
        unit,
        benefitType,
        details,
        decisionReason,
        budgetApproved,
        startDate,
      } = data;
      if (await repo.find({ soldierId })) {
        errorThrowing("Soldier is already exists.", 409);
      }

      if (benefitType === "giftCard") {
        const { cardProvide, monthlyValue, validMerchants } = details;
        if (!cardProvide || !monthlyValue || !validMerchants) {
          errorThrowing(
            "cardProvide, monthlyValue and validMerchants are requierd fields.",
            400,
          );
        }
        if (isNaN(Number(monthlyValue))) {
          errorThrowing("monthlyValue has to be a number", 400);
        }
        if (typeof validMerchants !== "object") {
          errorThrowing("validMerchants has to be array", 400);
        }
      } else if (benefitType === "diningHall") {
        const { baseId, kosherLevel, mealTimes } = details;
        if (!baseId || !kosherLevel || !mealTimes) {
          errorThrowing(
            "baseId, kosherLevel and mealTimes are requierd fields.",
            400,
          );
        }
        if (typeof mealTimess !== "object") {
          errorThrowing("mealTimes has to be array", 400);
        }
      }

      const newId = await repo.create({
        soldierId,
        unit,
        currentBenefitType: benefitType,
        history: [
          {
            startDate: startDate || new Date().toTimeString(),
            endDate: null,
            decisionReason,
            budgetApproved,
            benefitType,
            details,
          },
        ],
      });
      return await repo.find({ id: newId });
    },
    getBenefitById: async (soldierId) => {
      const benefit = await repo.find(soldierId);
      if (!benefit) {
        errorThrowing(
          `Walfare record for soldierId (${soldierId}) not found`,
          404,
        );
      }
      return benefit;
    },
    addBenefit: async (soldierId, data) => {
      const {
        benefitType,
        details,
        decisionReason,
        budgetApproved,
        decisionDate,
      } = data;
      
    },
  };
}
