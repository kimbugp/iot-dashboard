import { LOGIN } from "../../actions/actionTypes";

const initialState = {
    tenants: [],
    user:{}
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
