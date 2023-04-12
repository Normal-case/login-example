import styles from '../styles/Index.module.css'
import Link from 'next/link'

export default function Register() {
    return (
      <div>
        <div className={styles.form}>
          <input type='text' placeholder="이름" className={styles.input} />
          <input type='text' placeholder="아이디" className={styles.input} />
          <input type='password' placeholder="비밀번호" className={styles.input} />
          <input type='password' placeholder="비밀번호 확인" className={styles.input} />
          <div className={styles.button_container}>
            <button className={styles.button}>회원가입</button>
            <span className={styles.register_description}>
              <Link href='/'>이미 회원이신가요?</Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
  