import { ADD_USER, REMOVE_USER } from "../Actions/UserActions";

const initialState = {}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.data
            };
        case REMOVE_USER:
            return {
                initialState
            };
        default:
            return initialState;
    }
}

export default UserReducer;