import axios from 'axios'

const baseUrl = "/api/"



const postNewUser = ({username, password}) => {
    const data = {username: username, password: password}
    const ext = "user/newuser"
    return axios.post(`${baseUrl}${ext}`, data)
}

const loginUser = ({username, password}) => {
    const data = {username: username, password: password}
    const ext = "user/loginuser"
    return axios.post(`${baseUrl}${ext}`, data)
}

export default {postNewUser, loginUser}