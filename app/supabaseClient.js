import { AppState } from "react-native";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY} from '@env';

// ENV Variables
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

// Creating supabase client
export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});

// session check
export const getSession = async () => {
  const session = await supabase.auth.getSession();
  return session.data.session;
};

// app state shanges
AppState.addEventListener('change', async (state) => {
    if (state === 'active') {
      const session = await supabase.auth.getSession();
      if (session.data.session){
        supabase.auth.startAutoRefresh()
      }
    } else {
      supabase.auth.stopAutoRefresh()
    }
});