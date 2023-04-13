import styles from '../styles/Index.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import API from '../api'

export default function Register() {

    const router = useRouter()
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [psconfirm, setPsconfirm] = useState()

    // 에러 메시지 state
    const [errmsg, setErrmsg] = useState()

    const submitRegisterInfo = () => {

      // 빈 항목이 있을 경우
      if(!name || !username || !password || !psconfirm) {
        setErrmsg('모든 항목을 작성해주세요.')
        return
      }

      // 비밀번호에 정책에 맞지 않은 경우
      var pspolicy = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
      if(!pspolicy.test(password)) {
        setErrmsg('비밀번호는 숫자와 문자포함 8자 이상 20자 이하로 만들어주세요.')
        return
      }

      // 비밀번호가 일치하지 않은 경우
      if(password !== psconfirm) {
        setErrmsg('비밀번호가 일치하지 않습니다.')
        return
      }

      setErrmsg('')
      const body = {
        name,
        username,
        password
      }

      API.register(body)
        .then(res => {
          if(res.data.success) {
            alert('회원가입이 완료되었습니다.')
            router.push('/')
          }
        })
        .catch(err => {
          if(err.response && err.response.data.msg === "username alread exist") {
            setErrmsg('이미 존재하는 아이디입니다.')
          }
        })
    }

    return (
      <div>
        <div className={styles.form}>
          <input
            type='text' 
            placeholder="이름" 
            className={styles.input} 
            onChange={(e) => setName(e.target.value)}
          />
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
          <input 
            type='password' 
            placeholder="비밀번호 확인" 
            className={styles.input} 
            onChange={(e) => setPsconfirm(e.target.value)}
          />
          <div className={styles.button_container}>
            <button className={styles.button} onClick={submitRegisterInfo}>회원가입</button>
            <span className={styles.register_description}>
              <Link href='/'>이미 회원이신가요?</Link>
            </span>
          </div>

          {/* 회원가입 요청 시 발생하는 에러 메시지 출력 */}
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