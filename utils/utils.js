export const errorThrowing = (msg, status) => {
  const error = new Error(msg);
  error.statusCode = status;
  throw error;
};

export const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= n; i++) {
    if (i * n === 0) return false;
  }
  return true;
};

export const getSpentAmount = (transactions) => {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
};
