import supabase from "../db/supabase.js";

export default {
  create: async (spend) => {
    const { data, error } = await supabase
      .from("spends")
      .insert(spend)
      .select();
    if (!error) {
      return data;
    }
    return false;
  },
  getByBudgetId: async (budgetId) => {
    const { error, data } = await supabase
      .from("spends")
      .select()
      .eq("budgetId", budgetId);
    if (!error) {
      return data;
    }
    return null;
  },
};
