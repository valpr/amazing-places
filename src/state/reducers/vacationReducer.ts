import { ActionType } from '../action-types';
import { Action, CustomMarker } from '../actions';

const google = window.google;

interface VacationState {
    route: CustomMarker[];
    date?: Date;
    name: string;
    currentMarker?: Partial<CustomMarker>;
    latestID: number;
}

const currentMarkerDefaultState = {
    position: {
        lat: 0,
        lng: 0,
    },
    title: '',
    description: '',
    travelMode: google?.maps?.TravelMode?.DRIVING,
};

const initialState = {
    route: [
        {
            id: 1,
            position: {
                lat: -1.2884,
                lng: 22,
            },
            description: 'wow!',
            title: 'test',
            travelMode: google?.maps?.TravelMode?.DRIVING,
        },
    ],
    placeID: '',
    name: '',
    latestID: 1,
    currentMarker: currentMarkerDefaultState,
};

const reducer = (
    state: VacationState = initialState,
    action: Action,
): VacationState => {
    switch (action.type) {
        case ActionType.CREATE_MARKER:
            return {
                ...state,
                latestID: action.payload.id,
                route: [...state.route, action.payload],
                currentMarker: currentMarkerDefaultState,
            };
        case ActionType.DELETE_MARKER:
            return {
                ...state,
                route: state.route.filter(
                    (marker) => marker.id !== action.payload.id,
                ),
                currentMarker: currentMarkerDefaultState,
            };
        case ActionType.EDIT_MARKER:
            return {
                ...state,
                route: state.route.map((marker) =>
                    marker.id === action.payload?.id
                        ? { ...marker, ...action.payload }
                        : marker,
                ),
                currentMarker: currentMarkerDefaultState,
            };
        case ActionType.SET_CURRENT_MARKER:
            return {
                ...state,
                currentMarker: action.payload,
            };
        case ActionType.CLEAR_ROUTE:
            return {
                ...state,
                route: [],
            };
        case ActionType.CHANGE_TRAVEL_MODE:
            return {
                ...state,
                route: state.route.map((marker) =>
                    marker.id === action.payload?.id
                        ? { ...marker, travelMode: action.payload.TravelMode }
                        : marker,
                ),
            };
        default:
            return state;
    }
};

export default reducer;
