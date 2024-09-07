'use client'

import React, { useEffect, useState } from 'react';
import Wrapper from '../components/templates/Wrapper';
import Heading1 from '../components/atoms/Heading/Heading1';
import { useFetchCalculations } from '../hooks/useFetchCalculations';
import ResultClacBox from '../components/molecules/ResultClacBox';
import DeleteWarningModal from '../components/molecules/DeleteWarningModal';
import { useDeleteCalculation } from '../hooks/useDeleteCalculation';
import ContentsBox from '../components/molecules/ContentsBox';
import InputBox from '../components/molecules/InputBox';
import LabelHead from '../components/atoms/LabelHead/LabelHead';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

const MyPage = () => {
  const { calculations, loading, error, refetch } = useFetchCalculations();
  const { deleteCalculation } = useDeleteCalculation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCalculationId, setSelectedCalculationId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);


  useEffect(() => {
    const getEmail = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.log('ユーザー情報の取得に失敗しました：', error.message);
        return;
      }
      if (user) {
        setEmail(user.email);
      }
    }
    getEmail();
  }, [])

  const handleOpenModal = () => {
    if (showCalculation) {
      setSelectedCalculationId(showCalculation.id);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 計算結果の削除機能
  const handleDelete = async () => {
    if (selectedCalculationId) {
      try {
        await deleteCalculation(selectedCalculationId);
        alert('計算結果が削除されました');
        await refetch();
        handleCloseModal();
      } catch (error) {
        console.log('削除に失敗しました', error);
        alert('削除に失敗しました');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // 計算結果を1個のみ表示
  const showCalculation = calculations.length > 0 ? calculations[0] : null;

  // アクティブ度の英字を変換
  const getActivityLevel = (activityLevel: string) => {
    switch (activityLevel) {
      case 'lazy':
        return '通勤や軽い家事程度'
      case 'slightlyLazy':
        return '軽い運動やスポーツを週1-3回行う';
      case 'normal':
        return '中程度の運動やスポーツを週3-5回行う';
      case 'slightlyActive':
        return '激しい運動やスポーツを週6-7回行う';
      case 'active':
        return '非常に激しい運動やスポーツを毎日行う';
      default:
        return activityLevel
    }
  }
  // 性別の英字を変換
  const getGender = (gender: string) => {
    switch (gender) {
      case 'male':
        return '男性'
      case 'female':
        return '女性'
      default:
        return gender
    }
  }
  // 目的の英字を変換
  const getGoal = (goal: string) => {
    switch (goal) {
      case 'reduce':
        return '減量'
      case 'maintain':
        return '維持'
      case 'gain':
        return '増量'
      default:
        return goal
    }
  }


  return (
    <Wrapper>
      <Heading1>マイページ</Heading1>
      <InputBox>
        <LabelHead>登録済みメールアドレス</LabelHead>
        <span className="flex items-center px-3 py-2 h-12 bg-gray-800 text-white border border-gray-600 rounded-md w-full">{email}</span>
        <Link href="/change-email" className='underline hover:text-blue-600 text-sm'>メールアドレスを変更する</Link>
      </InputBox>
      <InputBox>
        <LabelHead>パスワード</LabelHead>
        <span className='flex items-center px-3 py-2 h-12 bg-gray-800 text-white border border-gray-600 rounded-md w-full'>********</span>
        <Link href="/change-password" className='underline hover:text-blue-600 text-sm'>パスワードを変更する</Link>
      </InputBox>
      <InputBox>
        <LabelHead>保存された計算結果</LabelHead>
        {!showCalculation ? (
          <p>保存された計算結果がありません。</p>
        ) : (
          <ul className='flex flex-col gap-3'>
            <li className='flex gap-3 items-center'>日付:<ResultClacBox divClassName='flex-1' spanClassName='w-full'>{new Date(showCalculation.created_at).toLocaleDateString()}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>性別:<ResultClacBox divClassName='flex-1' spanClassName='w-full'>{getGender(showCalculation.gender)}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>体重:<ResultClacBox divClassName='flex-1' spanClassName='w-full' units='kg'>{showCalculation.weight}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>身長:<ResultClacBox divClassName='flex-1' spanClassName='w-full' units='cm'>{showCalculation.height}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>年齢:<ResultClacBox divClassName='flex-1' spanClassName='w-full' units='歳'>{showCalculation.age}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>目的:<ResultClacBox divClassName='flex-1' spanClassName='w-full'>{getGoal(showCalculation.goal)}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>アクティブ度:<ResultClacBox divClassName='flex-1' spanClassName='w-full'>{getActivityLevel(showCalculation.activity_level)}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>カロリー:<ResultClacBox divClassName='flex-1' spanClassName='w-full' units='kcal/日'>{Math.floor(showCalculation.calories)}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>タンパク質:<ResultClacBox divClassName='flex-1' spanClassName='w-full' units='g/日'>{Math.floor(showCalculation.protein)}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>脂質:<ResultClacBox divClassName='flex-1' spanClassName='w-full' units='g/日'>{Math.floor(showCalculation.fat)}</ResultClacBox></li>
            <li className='flex gap-3 items-center'>炭水化物:<ResultClacBox divClassName='flex-1' spanClassName='w-full' units='g/日'>{Math.floor(showCalculation.carbs)}</ResultClacBox></li>
          </ul>
        )}
      </InputBox>
      {showCalculation &&
        <ContentsBox>
          <button
            onClick={handleOpenModal}
            className="bg-red-600 text-white font-bold py-2 px-4 min-h-12 rounded-md hover:bg-red-700 transition duration-300">
            計算結果を削除する
          </button>
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg">
            <h2 className="font-bold text-xl mb-2">削除する前に！</h2>
            <p className="text-base">
              削除してしまうと、計算結果に基づいて割り出された目標設定の項目や進捗報告画面での記録のデータが全て消去されてしまいますので、ご注意ください！
            </p>
          </div>
        </ContentsBox>
      }
      {/* 削除を確認させるモーダル作成 */}
      {isModalOpen &&
        <DeleteWarningModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      }
    </Wrapper>
  );
};

export default MyPage;