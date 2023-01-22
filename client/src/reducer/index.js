import { GET_COUNTRIES,FILTER_CONTINENT,SORT_NAME,SORT_POPULATION,SEARCH_COUNTRIES,GET_ACTIVITIES,POST_ACTIVITY,GET_DETAILS ,FILTER_ACTIVITY } from "../action";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    countryDetail: {},
}

function rootReducer(state = initialState, action){
    switch(action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            };
            case GET_DETAILS:
                return {
                    ...state,
                    countryDetail: action.payload
                };
        case SEARCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };
        case POST_ACTIVITY:
            return {
                ...state,
                countries: action.payload
            };
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        case FILTER_CONTINENT:
            const copyCountries = state.allCountries;
            const continent = action.payload ==='All' ? copyCountries : copyCountries.filter(c => c.continent === action.payload);
            return {
                ...state,
                countries: continent,

            }
        case FILTER_ACTIVITY:
            const copyCountries2 = state.allCountries;
            const activity = action.payload === 'All' ? copyCountries2 : copyCountries2.filter(c => c.activities.some(a => a.name === action.payload));
            return {
                ...state,
                countries: activity,
            }
        case SORT_NAME:
            let orderName = [...state.countries];
            orderName = orderName.sort((a,b) => {
                if(a.name < b.name) {
                    return action.payload === 'asc' ? -1 : 1;
                }
                if(a.name > b.name) {
                    return action.payload === 'asc' ? 1 : -1;
                }
                return 0;
            })
            if(action.payload === 'All') {
                orderName = state.allCountries;
            }
            return {
                ...state,
                countries: orderName,
            }
        case SORT_POPULATION:
            let orderPopulation = [...state.countries];
            orderPopulation = orderPopulation.sort((a,b) => {
                if(a.population < b.population) {
                    return action.payload === 'desc' ? -1 : 1;
                }
                if(a.population > b.population) {
                    return action.payload === 'desc' ? 1 : -1;
                }
                return 0;
            })
            if(action.payload === 'All') {
                orderPopulation = state.allCountries;
            }
            return {
                ...state,
                countries: orderPopulation,
            }

        default:
            return state;
    }
}


export default rootReducer;