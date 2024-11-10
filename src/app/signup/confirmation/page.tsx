"use client"

import React from 'react';
import Wrapper from '../../components/templates/Wrapper';
import Heading1 from '../../components/atoms/Heading/Heading1';
import PrimaryButton from '../../components/atoms/Button/PrimaryButton';
import { useRouter } from 'next/navigation';

const SignupConfirmation = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <Wrapper>
      <Heading1>認証メールをご確認ください</Heading1>
      <p className="mt-4 mb-6">
        ご登録いただいたメールアドレスに認証メールをお送りしました。<br />
        メール内のリンクをクリックして、アカウントの確認を完了してください。
      </p>
      <PrimaryButton onClick={handleReturnHome}>ホームへ戻る</PrimaryButton>
    </Wrapper>
  );
};

export default SignupConfirmation;