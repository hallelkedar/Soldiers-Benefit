import supabase from "../db/supabase.js";

export default {
  create: async (data) => {
    const { data, error } = await supabase.from("budget").insert(data).select();
    if (!error) {
        return data
    }
    return false
  },
  findById: (id) => {
    const {error, data} = await supabase.from('budget').select().eq('id', id)
    if (!error) {
        return data
    }
    return null
  },
  exactMatch: (unit, benefitType, month) => {
    const {error, data} = await supabase.from('budget').select().eq('unit', unit).eq('benefitType', benefitType)
    if (!error) {
        return data
    }
    return null
  }
};
