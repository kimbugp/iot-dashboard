import axios from 'axios';
import { GRAPH } from './actionTypes';
import { GRAPH_URL, SINGLE_SENSOR } from './index';
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