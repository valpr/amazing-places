import { ActionType } from '../action-types';
import { Action, Marker, tentativePosition } from '../actions';

interface VacationState {
    route: Marker[];
    date?: Date;
    name: string;
    currentMarker?: tentativePosition;
}

const initialState = {
    route: [
        {
            id: 0,
            position: {
                lat: -1.2884,
                lng: 22,
            },
            description: 'wow!',
            title: 'test',
        },
    ],
    date: undefined,
    name: '',
};

const reducer = (
    state: VacationState = initialState,
    action: Action,
): VacationState => {
    switch (action.type) {
        case ActionType.CREATE_MARKER:
            return { ...state, route: [...state.route, action.payload] };
        case ActionType.DELETE_MARKER:
            return state;
        case ActionType.EDIT_MARKER:
            return state;
        case ActionType.SET_CURRENT_MARKER:
            return {
                ...state,
                currentMarker: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
