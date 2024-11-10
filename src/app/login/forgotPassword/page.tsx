'use client'
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import Wrapper from '@/app/components/templates/Wrapper';
import Heading1 from '@/app/components/atoms/Heading/Heading1';
import ErrorText from '@/app/components/atoms/Text/ErrorText';
import InputBox from '@/app/components/molecules/InputBox';
import LabelHead from '@/app/components/atoms/LabelHead/LabelHead';
import Input from '@/app/components/atoms/Input/Input';
import PrimaryButton from '@/app/components/atoms/Button/PrimaryButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/login/forgotPassword/resettingPassword/`
    });

    if (error) {
      setError('パスワードリセットに失敗しました。メールアドレスが正しいかご確認ください。');
    } else {
      setMessage('パスワードリセット用のメールを送信しました。メールをご確認ください。');
      setError('');
    }
  };

  return (
    <Wrapper>
      <Heading1>パスワードリセット</Heading1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <ErrorText>{error}</ErrorText>}
      <form onSubmit={handlePasswordReset} className='flex flex-col gap-3'>
        <InputBox>
          <LabelHead>登録メールアドレス</LabelHead>
          <Input
            type='email'
            placeholder='メールアドレスを入力'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBox>
        <PrimaryButton type='submit'>パスワードリセットメールを送信</PrimaryButton>
      </form>
    </Wrapper>
  );
};

export default ForgotPassword;