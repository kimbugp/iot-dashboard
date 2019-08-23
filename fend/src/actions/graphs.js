import { GRAPH } from './actionTypes';
import axios, { GRAPH_URL } from './index';

const getGraphdata = (field) => {
    return async dispatch => {
        try {
            let number = 1
            let res = await axios.get(`${GRAPH_URL}?field=${field}&page=${number}`)
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