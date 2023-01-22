import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';
export const GET_DETAILS = 'GET_DETAILS';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const SORT_POPULATION = 'SORT_POPULATION';
export const SORT_NAME = 'SORT_NAME';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITY = 'POST_ACTIVITY';


export function getAllCountries() {
        return async function (dispatch) {
            const countries = await axios.get('http://localhost:3001/countries');
            return dispatch({
                type: GET_COUNTRIES,
                payload: countries.data 
            });
        };
};

export function searchCountries(name) {
    return async function (dispatch) {
            const countries = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: SEARCH_COUNTRIES,
                payload: countries.data
            });
    };
};

export function getCountryById(id){
    return async function(dispatch){
      let countryId = await axios.get(`http://localhost:3001/countries/${id}`)
      return dispatch({
      type: GET_DETAILS,
      payload: countryId.data
    }) 
    }
};

export function postActivity(payload) {
    return async function () {
            const res = await axios.post('http://localhost:3001/activities/', payload)
            return res;
    }
};

export function getActivities() {
    return async function (dispatch) {
        const activities = await axios.get('http://localhost:3001/activities');
        return dispatch({
            type: GET_ACTIVITIES,
            payload: activities.data
        });
    };
};

export function filterByContinent(continent) {
    return {
        type: FILTER_CONTINENT,
        payload: continent
    };
};

export function sortByPopulation(population) {
    return {
        type: SORT_POPULATION,
        payload: population
    };
};

export function sortByName(name) {
    return {
        type: SORT_NAME,
        payload: name
    };
};

export function filterByActivity(activity) {
    return {
        type: FILTER_ACTIVITY,
        payload: activity
    };
};
