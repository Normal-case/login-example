import styles from '../styles/Index.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className={styles.form}>
        <input type='text' placeholder="아이디" className={styles.input} />
        <input type='password' placeholder="비밀번호" className={styles.input} />
        <div className={styles.button_container}>
          <button className={styles.button}>로그인</button>
          <span className={styles.register_description}>
            <Link href='/register'>아직 회원이 아닌가요?</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
