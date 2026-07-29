import benefitsRepo from "../repository/benefitsRepo.js";
import { errorThrowing } from "../utils/utils.js";
import { benefitValidation } from "../utils/validation.js";

export default function createBenefitService(repo) {
  return {
    createBenefit: async (soldierId, data) => {
      const { unit, benefitType, details, decisionReason, budgetApproved } =
        data;
      if (await repo.find({ soldierId })) {
        errorThrowing("Soldier is already exists.", 409);
      }
      let startDate = null;
      if (data.startDate) {
        startDate = new Date(data.startDate).toDateString();
      }
      benefitValidation(benefitType, details, decisionReason, budgetApproved);

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
      const benefit = await repo.find(soldierId);
      if (!benefit) {
        errorThrowing(
          `Walfare record for soldierId (${soldierId}) not found`,
          404,
        );
        const {
          benefitType,
          details,
          decisionReason,
          budgetApproved,
          decisionDate,
        } = data;
        
        let startDate = null;
        if (data.startDate) {
          startDate = new Date(data.startDate).toDateString();
        }

        benefitValidation(benefitType, details, decisionReason, budgetApproved);
        if (decisionDate.getDate() === 1) {
          // && TODO if number of the day that pass from jan 1 that year (including it) is a prime number)
          return {
            reverted: true,
            reason: "Minister of finance is a bit despondent",
          };
        }

        benefit.benefitType = benefitType;
        benefit.currentBenefitType = new Date().toDateString();
        benefit.budgetApproved = budgetApproved;
        benefit.history[benefit.history.length - 1].endDate =
          new Date().toDateString();
        benefit.details.push({
          startDate: decisionDate || new Date().toTimeString(),
          endDate: null,
          decisionReason,
          budgetApproved,
          benefitType,
          details,
        });
        await repo.update(soldierId, benefit);
      }
    },
  };
}
