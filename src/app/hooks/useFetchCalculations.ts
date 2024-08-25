import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import useUserId from './useUserId';

type CalculationResult = {
  id: string;
  created_at: string;
  gender: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
  activity_level: string;
  bmr: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

export const useFetchCalculations = () => {
  const [calculations, setCalculations] = useState<CalculationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchCalculations = async () => { // useEffect の外に移動
    setLoading(true);
    if (!userId) {
      setError('ユーザーIDが取得できませんでした');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);
    if (error) {
      setError(error.message);
    } else {
      setCalculations(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await useUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCalculations();
    }
  }, [userId]);

  return { calculations, loading, error, refetch: fetchCalculations };
};