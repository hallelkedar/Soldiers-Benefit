import { errorThrowing } from "../utils/utils.js";
import createBenefitService from "../service/benefitsService.js";
import benefitsRepo from "../repository/benefitsRepo.js";

const benefitService = createBenefitService(benefitsRepo);

export default {
  postSoldierBenefit: async (req, res) => {
    const soldierId = req.params.soldierId;
    
    const {
      unit,
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      startDate,
    } = req.body;
    if (
      !unit ||
      !benefitType ||
      !details ||
      !decisionReason ||
      !budgetApproved
    ) {
      errorThrowing("Require field is missing.", 400);
    }

    if (!typeof details !== "object") {
      errorThrowing("details must be an object.", 400);
    }

    if (benefitType !== "giftCard" || "diningHall") {
      errorThrowing("benefitType must be giftCard or diningHall", 400);
    }

    if (typeof budgetApproved !== "boolean") {
      errorThrowing("budgetApproved must be true or false", 400);
    }

    const benefit = await benefitService.createBenefit(
      soldierId, {
      unit,
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      startDate,
    });
    return res.status(201).json({ success: true, data: benefit });
  },
  getSoldierBenefit: async (req, res) => {
    const soldierId = req.params.soldierId;
    console.log(soldierId)
    const benefit = await benefitService.getBenefitById(soldierId);
    return res.json({ success: true, data: benefit });
  },
  updateSoldierBenefit: async (req, res) => {
    const soldierId = req.params.soldierId;
    const {
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      decisionDate,
    } = req.body;

    if (!benefitType || !details || !decisionReason || !budgetApproved) {
      errorThrowing("Require field is missing.", 400);
    }

    if (!typeof details !== "object") {
      errorThrowing("details must be an object.", 400);
    }

    if (benefitType !== "giftCard" || "diningHall") {
      errorThrowing("benefitType must be giftCard or diningHall", 400);
    }

    if (typeof budgetApproved !== "boolean") {
      errorThrowing("budgetApproved must be true or false", 400);
    }
    const result = await benefitService.addBenefit(soldierId, {
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      decisionDate,
    });

    return res.json({ success: true, data: result });
  },
};
