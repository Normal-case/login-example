import styles from '../styles/Index.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import API from '../api'

export default function Home() {

  const router = useRouter()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [errmsg, setErrmsg] = useState()

  const submitLoginInfo = () => {

    if(!username || !password) {
      setErrmsg('아이디 비밀번호를 입력해주세요.')
      return
    }

    const body = {
      username,
      password
    }
    API.login(body)
      .then(res => {
        if(res.data.success) {
          setCookie('accesstoken', res.data.accesstoken)
          setCookie('refreshtoken', res.data.refreshtoken)
          router.push('/success')
        }
      })
      .catch(err => {
        if(err.response && err.response.data.msg === "Id or psword is wrong") {
          setErrmsg('아이디 또는 비밀번호가 올바르지 않습니다.')
        }
      })
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
        { 
          errmsg ? 
          <div className={styles.errmsg}>
            {errmsg}
          </div> : null
        }
      </div>
    </div>
  )
}
