import axios from 'axios'

const baseUrl = "http://localhost:3001/api/"



const getAllConsumedByDate = (user, date) => {
    const ext = `consumed/${user}&something${date}`
    return axios.get(`${baseUrl}${ext}`, )
        .then(response => response.data)
        .catch(error => {console.log(error);})

}

export default {getAllConsumedByDate}