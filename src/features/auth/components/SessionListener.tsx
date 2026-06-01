'use client'

import { useUserStore } from "@/src/shared/store/UserStore";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client"
import { useEffect } from "react";

export default function SessionListener() {
  const supabase = getSupabaseBrowserClient();

  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);

  useEffect(() => {
    const fetchProfile = async (id: string) => {
      const res = await fetch(`/api/profiles/${id}`, {
        method: 'GET'
      });

      if (!res.ok) throw new Error('Error consultando los datos');

      const profile = await res.json();

      if (profile) {
        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name,
          avatar_url: profile.avatar_url
        });
      }
    }

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();

      const session = data.session;

      if (session?.user.id) {
        await fetchProfile(session.user.id);
      }
    }

    initSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user.id) {
        await fetchProfile(session.user.id);
      } else {
        clearUser();
      }
    })

    return () => subscription.unsubscribe();
  }, []);

  return null;
}