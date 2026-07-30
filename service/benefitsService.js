import { errorThrowing, getNumOfDaysUntil, isPrime } from "../utils/utils.js";

export default function createBenefitService(repo) {
  return {
    createBenefit: async (soldierId, data) => {
      const { unit, benefitType, details, decisionReason, budgetApproved } =
        data;
      if (await repo.find({ soldierId })) {
        errorThrowing("Soldier is already exists.", 409);
      }
      let entryStartDate = new Date().toDateString();
      if (data.startDate) {
        entryStartDate = new Date(data.startDate).toDateString();
      }

      const newId = await repo.create({
        soldierId,
        unit,
        currentBenefitType: benefitType,
        history: [
          {
            startDate: entryStartDate,
            endDate: null,
            decisionReason,
            budgetApproved,
            benefitType,
            details,
          },
        ],
      });
      return await repo.find({ soldierId });
    },
    getBenefitById: async (soldierId) => {
      const benefit = await repo.find({ soldierId });
      if (!benefit) {
        errorThrowing(
          `Walfare record for soldierId (${soldierId}) not found`,
          404,
        );
      }
      return benefit;
    },
    addBenefit: async (soldierId, data) => {
      const benefit = await repo.find({ soldierId });
      if (!benefit) {
        errorThrowing(
          `Walfare record for soldierId (${soldierId}) not found`,
          404,
        );
      }
      const { benefitType, details, decisionReason, budgetApproved } = data;

      let entryStartDate = new Date();
      if (data.decisionDate) {
        entryStartDate = new Date(data.decisionDate);
      }

      if (
        entryStartDate.getDate() === 1 &&
        isPrime(getNumOfDaysUntil(entryStartDate))
      ) {
        return {
          reverted: true,
          reason: "Minister of finance is a bit despondent",
        };
      }

      benefit.currentBenefitType = benefitType;
      benefit.history[benefit.history.length - 1].endDate =
        new Date().toDateString();
      benefit.history.push({
        startDate: entryStartDate,
        endDate: null,
        decisionReason,
        budgetApproved,
        benefitType,
        details,
      });
      if (await repo.update(soldierId, benefit)) {
        return {
          reverted: false,
          reason: "",
        };
      }
    },
  };
}
