


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

    
    // const now = Date()
    // const now = "2022-10-10 11:30:30"
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    out.consumed_at = now
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


export default {validateConsumed}