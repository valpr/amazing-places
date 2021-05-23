import { ActionType } from '../action-types';
import { Action, CustomMarker } from '../actions';

interface VacationState {
    route: CustomMarker[];
    date?: Date;
    name: string;
    currentMarker?: Partial<CustomMarker>;
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
            return {
                ...state,
                route: state.route.filter(
                    (marker) => marker.id !== action.payload.id,
                ),
            };
        case ActionType.EDIT_MARKER:
            return {
                ...state,
                route: state.route.map((marker) =>
                    marker.id === action.payload?.id
                        ? { ...marker, ...action.payload }
                        : marker,
                ),
            };
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
