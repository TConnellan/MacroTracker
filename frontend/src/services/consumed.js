import axios from 'axios'

const baseUrl = "/api/"



const getAllConsumedByDate = (date) => {
    const ext = `consumed/${date}`
    return axios.get(`${baseUrl}${ext}`)
        .then(response => response.data)
        .catch(error => {console.log(error);})

}

const postConsumedEvent = (data) => {
    const ext = `consumed/addconsumed`
    return axios.post(`${baseUrl}${ext}`, data)
}

const deleteConsumedEvent = (id) => {
    const ext = `consumed/${id}`
    return axios.delete(`${baseUrl}${ext}`)

}

const getConsumableSearchResults = (searchName) => {
    const ext = `consumable/search/${searchName}`
    return axios.get(`${baseUrl}${ext}`)
                .then(response => response.data)
                .catch(error => {console.log(error);})
}

const postNewConsumable = (data) => {
    const ext  = `consumable/addconsumable`
    return axios.post(`${baseUrl}${ext}`, data)
}

const postNewRecipe = (data) => {
    const ext = `recipe/addrecipe`
    return axios.post(`${baseUrl}${ext}`, data)
}

const getRecipeSearchResults = (searchName) => {
    const ext = `recipe/search/${searchName}`
    return axios.get(`${baseUrl}${ext}`)
                .then(response => response.data)
                .catch(error => {console.log(error);})
}

export default {getAllConsumedByDate, postNewConsumable, postConsumedEvent, deleteConsumedEvent, getConsumableSearchResults, postNewRecipe, getRecipeSearchResults}
