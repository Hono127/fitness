import React from 'react'
import Wrapper from '../components/templates/Wrapper'
import Heading1 from '../components/atoms/Heading/Heading1'
import InputBox from '../components/molecules/InputBox'
import LabelHead from '../components/atoms/LabelHead/LabelHead'

const ChangeEmail = () => {
  return (
    <Wrapper>
      <Heading1>メールアドレス変更</Heading1>
      <InputBox>
        <LabelHead>現在のメールアドレス</LabelHead>
        <span>メールアドレス</span>
      </InputBox>
      <div>page</div>
    </Wrapper>
  )
}

export default ChangeEmail