const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "FILTER_BY_TEMPERAMENT":
            const allDogs = state.allDogs;
            
            

             const filteredDogs = action.payload === "Todos" ? allDogs : allDogs.filter(el => el.temperaments?.includes(action.payload))
            return {
                ...state,
                dogs: filteredDogs
            }
        
        default: return state
       
    };
};

export default rootReducer;

