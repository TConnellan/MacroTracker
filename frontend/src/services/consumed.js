import axios from 'axios'

const baseUrl = "/api/"



const getAllConsumedByDate = (user, date) => {
    const ext = `consumed/${user}&${date}`
    return axios.get(`${baseUrl}${ext}`, )
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
const postNewConsumable = (data) => {
    const ext  = `consumed/addconsumable`
    return axios.post(`${baseUrl}${ext}`, data)
}

const postConsumedEvent = (data) => {
    const ext = `consumed/addconsumed`
    return axios.post(`${baseUrl}${ext}`, data)
}

export default {getAllConsumedByDate, postNewConsumable, postConsumedEvent}
