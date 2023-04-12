import styles from '../styles/Index.module.css'
import Link from 'next/link'
import { useState } from 'react'
import API from '../api'

export default function Home() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const submitLoginInfo = () => {
    const body = {
      username,
      password
    }
    API.login(body)
      .then(console.log)
      .catch(console.log)
  }

  return (
    <div>
      <div className={styles.form}>
        <input 
          type='text' 
          placeholder="아이디" 
          className={styles.input} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type='password' 
          placeholder="비밀번호" 
          className={styles.input} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <div className={styles.button_container}>
          <button className={styles.button} onClick={submitLoginInfo}>로그인</button>
          <span className={styles.register_description}>
            <Link href='/register'>아직 회원이 아닌가요?</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
