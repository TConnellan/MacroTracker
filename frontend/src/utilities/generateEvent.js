
class EventTemplateGenerator {
    emptyCons = {name:'',brand:'',size:0, units:'', carbs:0, fats:0, proteins:0}
    emptyConsumedEvent = {user_id: null, recipe_id: null, quantity: '', carbs: 0, fats: 0, proteins: 0, consumed_at: null, notes:''}
    emptyRecipeComponent = {recipe_id: null, component_id: null, created_at: null, quantity: 1, step_no: 1, step_description: ''}
    emptyConsumable = {cons_name: "", brand_name: "", size: 1, units: "", carbs: 0, fats: 0, proteins: 0}

    constructor() {}

    static getEmptyConsumedEvent(user_id, consumed_date) {
        return {...this.emptyConsumedEvent, user_id: user_id, consumed_at: consumed_date}
    }

    static getEmptyRecipeComponent(step_no = 1) {
        return {...this.emptyRecipeComponent, step_no: step_no}
    }

    static getEmptyConsumable() {
        return {...this.emptyConsumable}
    }
}


export default EventTemplateGenerator