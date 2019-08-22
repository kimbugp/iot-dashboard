import axios from 'axios';
import { GRAPH } from './actionTypes';

const getGraphdata = (number) => {
    return async dispatch => {
        try {
            let res = await axios.get(`https://thingspeak.com/channels/338402/field/${number}.json`)
            dispatch({
                type: GRAPH,
                payload: res,
                field: `field${number}`
            });
        }
        catch (error) {
            console.log(error)
        }
        return 'done';
    }
};
export default getGraphdata;