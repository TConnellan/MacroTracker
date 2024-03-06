import axios from 'axios'

const baseUrl = "/api/"



const getAllConsumedByDate = (user, date, token) => {
    const ext = `consumed/${user}&${date}`
    return axios.get(`${baseUrl}${ext}`, {headers: {authorization: `Bearer ${token}`}})
        .then(response => response.data)
        .catch(error => {console.log(error);})

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

const getConsumableSearchResults = (searchName, token) => {
    const ext = `consumable/search/${searchName}`
    return axios.get(`${baseUrl}${ext}`, {headers: {authorization: `Bearer ${token}`}})
                .then(response => response.data)
                .catch(error => {console.log(error);})
}

const postNewConsumable = (data, token) => {
    const ext  = `consumable/addconsumable`
    // data.headers = {authorization: `Bearer ${token}`}
    return axios.post(`${baseUrl}${ext}`, data, {headers: {authorization: `Bearer ${token}`}})
}

const postNewRecipe = (data, token) => {
    const ext = `recipe/addrecipe`
    return axios.post(`${baseUrl}${ext}`, data, {headers: {authorization: `Bearer ${token}`}})
}

const getRecipeSearchResults = (searchName, token) => {
    const ext = `recipe/search/${searchName}`
    return axios.get(`${baseUrl}${ext}`, {headers: {authorization: `Bearer ${token}`}})
                .then(response => response.data)
                .catch(error => {console.log(error);})
}

export default {getAllConsumedByDate, postNewConsumable, postConsumedEvent, deleteConsumedEvent, getConsumableSearchResults, postNewRecipe, getRecipeSearchResults}
