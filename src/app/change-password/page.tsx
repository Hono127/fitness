'use client'
import React, { useState } from 'react'
import Wrapper from '../components/templates/Wrapper'
import Heading1 from '../components/atoms/Heading/Heading1'
import InputBox from '../components/molecules/InputBox'
import LabelHead from '../components/atoms/LabelHead/LabelHead'
import { supabase } from '../lib/supabaseClient'
import PrimaryButton from '../components/atoms/Button/PrimaryButton'
import Input from '../components/atoms/Input/Input'
import ErrorText from '../components/atoms/Text/ErrorText'
import Form from '../components/organisms/Form'
import { useRouter } from 'next/navigation'

const ChangePassword = () => {
  // const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage('パスワードを入力してください');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('新しいパスワードが一致しません。');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      setMessage(`パスワード変更に失敗しました: ${error.message}`);
    } else {
      alert('パスワードが変更されました。');
      router.push('/');
    }
  };


  return (
    <Wrapper>
      <Heading1>パスワード変更</Heading1>
      <Form onSubmit={changePassword}>
        {/* <InputBox>
        <LabelHead>現在のパスワード</LabelHead>
        <Input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <span className='flex items-center px-3 py-2 h-12 bg-gray-800 text-white border border-gray-600 rounded-md w-full'>{currentPaddword}</span>
      </InputBox> */}
        <InputBox>
          <LabelHead>新しいパスワード</LabelHead>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='新しいパスワードを入力'
          />
        </InputBox>
        <InputBox>
          <LabelHead>新しいパスワードを確認</LabelHead>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='新しいパスワードをもう一度入力'
          />
        </InputBox>
        {message && <ErrorText>{message}</ErrorText>}
        <PrimaryButton type='submit'>変更する</PrimaryButton>
      </Form>
    </Wrapper>
  )
}

export default ChangePassword