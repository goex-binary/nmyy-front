import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import baseUrl from "@/config/baseUrl"

let loading = null

const BASE_URL = process.env.NODE_ENV === 'production' ? baseUrl : '/'

// create an axios instance
const service = axios.create({
    baseURL: BASE_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        loading = Loading.service({
            lock: true,
            text: '加载中 . . .',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        loading.close();
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 0 && res.code !== 200 && res.ErrCode !== 200 && res.code !== "00000") {
            Message({
                message: '请求超时...',
                type: 'error',
                duration: 2 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 900001) {
                // to re-login
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
                // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                //   confirmButtonText: 'Re-Login',
                //   cancelButtonText: 'Cancel',
                //   type: 'warning'
                // }).then(() => {
                //   store.dispatch('user/resetToken').then(() => {
                //     location.reload()
                //   })
                // })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        if (error.response.status == '401') {
            loading.close();
            store.dispatch('user/resetToken').then(() => {
                location.reload()
            })
        }
        Message({
            message: error.message || 'Error',
            type: 'error',
            duration: 2 * 1000
        })

        loading.close();
        return Promise.reject(error)

    }
)

export default service
