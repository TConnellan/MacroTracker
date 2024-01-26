
class consumedEventGenerator {
    emptyCons = {name:'',brand:'',size:0, units:'', carbs:0, fats:0, proteins:0}
    emptyConsumedEvent = {user_id: null, recipe_id: null, quantity: '', carbs: 0, fats: 0, proteins: 0, consumed_at: null, notes:''}
    constructor() {}

    static getEmptyConsumedEvent(user_id, consumed_date) {
        return {...this.emptyConsumedEvent, user_id: user_id, consumed_at: consumed_date}
    }
}

export default consumedEventGenerator