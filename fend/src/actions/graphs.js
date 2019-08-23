import { GRAPH } from './actionTypes';
import axios, { GRAPH_URL } from './index';

const getGraphdata = (field, query) => {
    return async dispatch => {
        try {
            let res = await axios.get(`${GRAPH_URL}?${query}`)
            dispatch({
                type: GRAPH,
                payload: res,
                field: `field${field}`
            });
        }
        catch (error) {
            console.log(error)
        }
        return 'done';
    }
};
export default getGraphdata;