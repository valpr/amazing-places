import { ActionType } from '../action-types';
import { Action, Marker } from '../actions';

interface VacationState {
    route: Marker[];
    date?: Date;
    name: string;
}

const initialState = {
    route: [],
    date: undefined,
    name: '',
};

const reducer = (
    state: VacationState = initialState,
    action: Action,
): VacationState => {
    switch (action.type) {
        case ActionType.CREATE_MARKER:
            return { ...state, route: state.route };
        case ActionType.DELETE_MARKER:
        case ActionType.EDIT_MARKER:
        default:
            return state;
    }
};

export default reducer;
