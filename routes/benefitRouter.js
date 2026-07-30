import express from "express";
import benefits from "../controllers/benefits.js";

const router = express.Router({});

router.post("/:soldierId/benefits", benefits.postSoldierBenefit);
router.get("/:soldierId/benefits", benefits.getSoldierBenefit);
router.patch("/:soldierId/benefits", benefits.updateSoldierBenefit);

export default router;
