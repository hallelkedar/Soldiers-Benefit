import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config()

export default await createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)

