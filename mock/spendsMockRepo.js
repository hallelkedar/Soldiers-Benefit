import { mock } from "node:test";

const spends = [
  {
    id: 1,
    budgetId: 12,
    amount: 30,
    reason: "Be",
  },
];

export default {
  create: mock.fn(async (data) => {
    const existingIds = spends.map((spend) => spend.id);
    const newId = Math.max(1, ...existingIds) + 1;
    const createdAt = new Date().toDateString();
    const spend = { newId, createdAt, ...data };
    spends.push(spend);
    return spend;
  }),
  getAll: mock.fn(async () => {
    return spends;
  }),
};
