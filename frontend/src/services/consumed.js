import axios from 'axios'

const baseUrl = "/api/"



const getAllConsumedByDate = (user, date, token) => {
    const ext = `consumed/${user}&${date}`
    return axios.get(`${baseUrl}${ext}`, {headers: {authorization: `Bearer ${token}`}})
        .then(response => response.data)
        .catch(error => {console.log(error);})

}

/*
data=
{name
brand_name,
size
units
carbs
fats
proteins}
*/
const postNewConsumable = (data, token) => {
    const ext  = `consumed/addconsumable`
    // data.headers = {authorization: `Bearer ${token}`}
    return axios.post(`${baseUrl}${ext}`, data, {headers: {authorization: `Bearer ${token}`}})
}

const postConsumedEvent = (data, token) => {
    const ext = `consumed/addconsumed`
    // data.headers = {...data.headers, authorization: `Bearer ${token}`}
    return axios.post(`${baseUrl}${ext}`, data, {headers: {authorization: `Bearer ${token}`}})
}

const deleteConsumedEvent = (id, token) => {
    const ext = `consumed/${id}`
    return axios.delete(`${baseUrl}${ext}`, {headers: {authorization: `Bearer ${token}`}})

}

export default {getAllConsumedByDate, postNewConsumable, postConsumedEvent, deleteConsumedEvent}
