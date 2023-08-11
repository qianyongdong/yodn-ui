import { Get, Post } from './server'

export function getTest() {
    return Get("/url/test")
}
export function postTest(data, params) {
    return Post("/url/test", data, params)
}