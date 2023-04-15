import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import API from '../api'

export default function Success() {
  
  const router = useRouter()

  useEffect(() => {
      API.profile()
        .then(res => {
          if(res.data.access) {
            setCookie('accesstoken', res.data.access)
          }
        })
        .catch((err) => {
          if(err.response) router.push('/')
        })
  }, [])

  return (
    <div>
        프로필 페이지입니다.
    </div>
  )
}