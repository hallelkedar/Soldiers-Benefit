import { errorThrowing } from "../utils/utils.js";
import createBenefitService from "../service/benefitsService.js";
import benefitsRepo from "../repository/benefitsRepo.js";
import {
  benefitsSchema,
  addBenefitSchema,
} from "../validation/benefitSchema.js";

const benefitService = createBenefitService(benefitsRepo);

export default {
  postSoldierBenefit: async (req, res) => {
    const soldierId = +req.params.soldierId;
    const {
      unit,
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      startDate,
    } = req.body;

    const validation = benefitsSchema.safeParse({
      unit,
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      startDate,
    });
    if (!validation.success) {
      errorThrowing(validation.error.issues[0].message, 400);
    }
    const benefit = await benefitService.createBenefit(soldierId, {
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
    const soldierId = +req.params.soldierId;
    const benefit = await benefitService.getBenefitById(soldierId);
    return res.json({ success: true, data: benefit });
  },
  updateSoldierBenefit: async (req, res) => {
    const soldierId = +req.params.soldierId;
    const {
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      decisionDate,
    } = req.body;
    const validation = addBenefitSchema.safeParse({
      benefitType,
      details,
      decisionReason,
      budgetApproved,
      decisionDate,
    });
    if (!validation.success) {
      console.log(validation.error.issues[0].message);
      errorThrowing(validation.error.issues[0].message, 400);
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
