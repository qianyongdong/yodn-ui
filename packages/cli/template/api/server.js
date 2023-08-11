import axios from 'axios'

import {
    handleChangeRequestHeader,
    handleConfigureAuth,
    handleAuthError,
    handleGeneralError,
    handleNetworkError
} from './tool.js'


const instance = axios.create({
    // 在这里设置 baseURL
    baseURL: '/api', // 替换为你的实际 baseURL
});

instance.interceptors.request.use((config) => {
    config = handleChangeRequestHeader(config)
    config = handleConfigureAuth(config)
    return config
})

instance.interceptors.response.use(
    (response) => {
        if (response.status !== 200) return Promise.reject(response.data)
        handleAuthError(response.data.code || response.status)
        handleGeneralError(response.data.code || response.status, response.data.msg)
        return response
    },
    (err) => {
        handleNetworkError(err.response?.status);
        return Promise.reject(err)
    }
)

export const Get = (url, params = {}, clearFn) =>
    new Promise((resolve) => {
        instance
            .get(url, { params })
            .then((result) => {
                let res
                if (clearFn !== undefined) {
                    res = clearFn(result.data)
                } else {
                    res = result.data
                }
                resolve([null, res])
            })
            .catch((err) => {
                resolve([err, undefined])
            })
    })

export const Post = (url, data, params = {}) => {
    return new Promise((resolve) => {
        instance
            .post(url, data, { params })
            .then((result) => {
                resolve([null, result.data])
            })
            .catch((err) => {
                resolve([err, undefined])
            })
    })
}
