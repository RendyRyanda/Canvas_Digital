import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tzmxcnnzessqbqfxyxgq.supabase.co";
const supabaseAnonKey = "sb_publishable_EUaPl-ETsqJB8sJMrYxJ0g_BYUlJ8ka";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
