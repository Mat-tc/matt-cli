import axios from 'axios'
// 일반적인 axios 인스턴스 사용시에 사용
function createInstance(url) {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}${url}`,
  })
}

function createInstaceWithAuth(url) {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}${url}`,
    withCredentials: true,
  })
}

export const user = createInstance('/user')
export const login = createInstaceWithAuth('/login')
export const class_ = createInstance('/class')
export const tag = createInstance('/tagInfo')
export const instructor = createInstaceWithAuth('/instructor')
export const waiting = createInstaceWithAuth('/waitingStudent')
export const logout = createInstance('/logout')
