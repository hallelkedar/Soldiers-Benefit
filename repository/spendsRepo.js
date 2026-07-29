import supabase from "../db/supabase.js";

export default {
  create: async (data) => {
    const { data, error } = await supabase.from("budget").insert(data).select();
    if (!error) {
        return data
    }
    return false
  },
  getByBudgetId: (budgetId) => {
    const {error, data} = await supabase.from('budget').select().eq({budgetId})
    if (!error) {
        return data
    }
    return null
  },
};
