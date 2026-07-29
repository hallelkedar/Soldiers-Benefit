import supabase from "../db/supabase.js";

export default {
  create: async (spend) => {
    const { data, error } = await supabase
      .from("budget")
      .insert(spend)
      .select();
    if (!error) {
      return data;
    }
    return false;
  },
  getByBudgetId: async (budgetId) => {
    const { error, data } = await supabase
      .from("budget")
      .select()
      .eq({ budgetId });
    if (!error) {
      return data;
    }
    return null;
  },
};
