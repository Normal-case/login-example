import axios from 'axios'
import { getCookie } from 'cookies-next'

const domain = "http://localhost:8000"

export default class API {
    static login(body) {
        return axios.post(`${domain}/login`, body, {
            headers: { "Content-Type": "application/json" }
        })
    }

    static register(body) {
        return axios.post(`${domain}/register`, body, {
            headers: { "Content-Type": "application/json" }
        })
    }

    static profile() {
        const accesstoken = getCookie('accesstoken')
        const refreshtoken = getCookie('refreshtoken')
        return axios.get(`${domain}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'access': 'Bearer ' + accesstoken,
                'refresh': 'Bearer ' + refreshtoken
            }
        })
    }
}