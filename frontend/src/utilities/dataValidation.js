


const validateConsumed = (data) => {
    const out = {...data}
    
    

    out.carbs = parseFloat(out.carbs)
    out.fats = parseFloat(out.fats)
    out.proteins = parseFloat(out.proteins)
    out.quantity = parseFloat(out.quantity)

    if (isNaN(out.carbs)) {
        throw new Error("Carbs must be a number")
    }
    if (isNaN(out.fats)) {
        throw new Error("Fats must be a number")
    }
    if (isNaN(out.proteins)) {
        throw new Error("Proteins must be a number")
    }

    if (out.carbs < 0 || out.fats < 0 || out.proteins < 0 || out.quantity < 0) {
        throw new Error("Numbers must be positive")
    }

    
    //const now = Date()
    // const now = "2022-10-10 11:30:30"
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // console.log(out.date);
    out.consumed_at = out.consumed_at.toISOString().slice(0, 19).replace('T', ' ');
    console.log(`after transform: ${out.consumed_at}`)
    if (out.created_at == null) {
        out.created_at = now
    }
    if (out.last_edited_at == null) {
        out.last_edited_at = out.created_at
    } else {
        out.last_edited_at = now
    }

    return out
}


// Following taken from https://trymysolution.medium.com/javascript-date-as-in-yyyy-mm-dd-hh-mm-ss-format-or-mm-dd-yyyy-hh-mm-ss-a0c96e8fa888
function padTwoDigits(num) {
    return num.toString().padStart(2, "0");
}
  
function dateInYyyyMmDdHhMmSs(date, dateDiveder="-") {
    // :::: Exmple Usage ::::
    // The function takes a Date object as a parameter and formats the date as YYYY-MM-DD hh:mm:ss.
    // 👇️ 2023-04-11 16:21:23 (yyyy-mm-dd hh:mm:ss)
    //console.log(dateInYyyyMmDdHhMmSs(new Date()));
  
    //  👇️️ 2025-05-04 05:24:07 (yyyy-mm-dd hh:mm:ss)
    // console.log(dateInYyyyMmDdHhMmSs(new Date('May 04, 2025 05:24:07')));
    // Date divider
    // 👇️ 01/04/2023 10:20:07 (MM/DD/YYYY hh:mm:ss)
    // console.log(dateInYyyyMmDdHhMmSs(new Date(), "/"));
    return (
      [
        date.getFullYear(),
        padTwoDigits(date.getMonth() + 1),
        padTwoDigits(date.getDate()),
      ].join(dateDiveder) +
      " " +
      [
        padTwoDigits(date.getHours()),
        padTwoDigits(date.getMinutes()),
        padTwoDigits(date.getSeconds()),
      ].join(":")
    );
}


export default {validateConsumed, dateInYyyyMmDdHhMmSs}