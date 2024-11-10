'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import Wrapper from '@/app/components/templates/Wrapper';
import Heading1 from '@/app/components/atoms/Heading/Heading1';
import ErrorText from '@/app/components/atoms/Text/ErrorText';
import InputBox from '@/app/components/molecules/InputBox';
import LabelHead from '@/app/components/atoms/LabelHead/LabelHead';
import Input from '@/app/components/atoms/Input/Input';
import PrimaryButton from '@/app/components/atoms/Button/PrimaryButton';
import Form from '@/app/components/organisms/Form';

// 新しいパスワードを設定する画面
const ResettingPassword = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordReEnter, setNewPasswordReEnter] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const isPasswordValid =
      newPassword === newPasswordReEnter &&
      newPassword.length >= 6 &&
      newPasswordReEnter.length >= 6;

    setIsDisabled(!isPasswordValid);
  }, [newPassword, newPasswordReEnter]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(`パスワードリセットに失敗しました: ${error.message}`);
      setMessage('');
    } else {
      setMessage('パスワードのリセットに成功しました。');
      setError('');
    }
  };

  return (
    <Wrapper>
      <Heading1>パスワードリセット</Heading1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <ErrorText>{error}</ErrorText>}
      <Form onSubmit={handlePasswordReset}>
        <InputBox>
          <LabelHead>新しいパスワード</LabelHead>
          <Input
            type='password'
            placeholder='新しいパスワード'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <LabelHead>新しいパスワードを再入力</LabelHead>
          <Input
            type='password'
            placeholder='新しいパスワードを再入力'
            value={newPasswordReEnter}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPasswordReEnter(e.target.value)}
          />
        </InputBox>
        {newPassword !== newPasswordReEnter && (
          <ErrorText>新しいパスワードと再入力されたパスワードが一致しません</ErrorText>
        )}
        <PrimaryButton type='submit' disabled={isDisabled}>パスワードを変更</PrimaryButton>
      </Form>
    </Wrapper>
  );
};

export default ResettingPassword;