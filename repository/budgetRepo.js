import supabase from "../db/supabase.js";

export default {
  create: async (data) => {
    const { data, error } = await supabase.from("budget").insert(data).select();
    if (!error) return data;
    return false;
  },
  findById: async (id) => {
    const { data, error } = await supabase.from("budget").select().eq({ id });
    if (!error) return data;
    return false;
  },
  find: async (unit = null, benefitType = null, month = null) => {
    let query = supabase;
    await supabase.from("budget").select();

    if (unit) {
      query = query.eq("unit", unit);
    }
    if (unit) {
      query = query.eq("benefitType", benefitType);
    }
    if (unit) {
      query = query.eq("month", month);
    }
    const { error, data } = await query;
    if (!error) {
      return data;
    }
    return null;
  },
};
