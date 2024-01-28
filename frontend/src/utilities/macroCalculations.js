
const formatDate = (date) => {
    const formattedDate = new Date(date)
    // return formattedDate.getDate() + "/" + (formattedDate.getMonth()+1) + "/" + (formattedDate.getFullYear() % 100) + " " +  formattedDate.getHours() + ":" + formattedDate.getMinutes();
    return ("0" + formattedDate.getDate()).slice(-2) + "/" + ("0"+(formattedDate.getMonth()+1)).slice(-2) + "/" +
    formattedDate.getFullYear() + " " + ("0" + formattedDate.getHours()).slice(-2) + ":" + ("0" + formattedDate.getMinutes()).slice(-2);
}


const calculateKilojoules = (carbs, fats, proteins) => {
    return carbs*16.7 + fats*37.7 + proteins*16.7
}


export default {calculateKilojoules, formatDate};