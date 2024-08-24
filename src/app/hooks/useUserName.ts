import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

const useUserName = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userNameParam = new URLSearchParams(window.location.search).get('userName');
    if (userNameParam) {
      setUserName(userNameParam);
    } else {
      const getUserInfo = async () => {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUserName(data.user.user_metadata?.name || 'ゲスト');
        }
      };
      getUserInfo();
    }
  }, [router]);

  return userName;
};

export default useUserName;
