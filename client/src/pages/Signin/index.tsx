import useInput from 'hooks/useInput'
import useTitle from 'hooks/useTitle';
import { ChangeEvent, useState } from 'react'

export const Signin = () => {
  useTitle('HOW ABOUT OOTD | SIGNIN');
  const [email, onChangeEmail] = useInput('');
  console.log(email);

  return (
    <form>
      <label htmlFor='email'>
        <input id='email' type='text' onChange={onChangeEmail}/>
      </label>
    </form>
  )
}
