"use client"

import React, { useEffect, useState } from 'react'
import HumbergerMenu from '@/app/components/organisms/HumbergerMenu';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const Header = () => {

  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };
  return (
    <header className="bg-gray-800 text-white max-w-full p-6">
      <div className="max-w-5xl w-full mx-auto flex justify-between ">
        <div className='flex justify-between w-full'>
          <a href="/" className="flex items-center justify-end text-2xl font-bold whitespace-nowrap">Fitness-App</a>
        </div>
        <HumbergerMenu />
      </div>

    </header >
  )
}

export default Header