import supabase from "../db/supabase.js";

export default {
  create: async (budget) => {
    const { data, error } = await supabase
      .from("budget")
      .insert(budget)
      .select();
    if (!error) return data;
    return false;
  },
  findById: async (id) => {
    const { data, error } = await supabase.from("budget").select().eq("id", id);
    if (!error && data.length !== 0) return data;
    return false;
  },
  find: async (unit = null, benefitType = null, month = null) => {
    let query = supabase.from("budget").select();

    if (unit) {
      query = query.eq("unit", unit);
    }
    if (benefitType) {
      query = query.eq("benefitType", benefitType);
    }
    if (month) {
      query = query.eq("month", month);
    }
    const { error, data } = await query;
    if (!error) {
      return data;
    }
    throw error
  },
};
