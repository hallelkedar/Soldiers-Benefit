import { errorThrowing } from "./utils.js";

export const benefitValidation = (
  benefitType,
  details,
  decisionReason,
  budgetApproved,
) => {
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
};
