import { ActionType } from '../action-types';
import { Action, CustomMarker } from '../actions';

const google = window.google;

interface VacationState {
    route: CustomMarker[];
    date?: Date;
    name: string;
    currentMarker?: Partial<CustomMarker>;
    latestID: number;
    googleObjects: {
        map?: google.maps.Map<Element>;
        directionsService?: google.maps.DirectionsService;
    };
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
                lat: 37.3867049,
                lng: -122.0319803,
            },
            description: 'First place',
            title: 'Place 1',
            travelMode: google?.maps?.TravelMode?.DRIVING,
        },
        {
            id: 2,
            position: {
                lat: 37.4529598,
                lng: -122.1817252,
            },
            description: 'Second Place',
            title: 'Place 2',
            travelMode: google?.maps?.TravelMode?.DRIVING,
        },
        {
            id: 3,
            position: {
                lat: 38.4529598,
                lng: -122.1817252,
            },
            description: 'Third Place',
            title: 'Place 3',
            travelMode: google?.maps?.TravelMode?.DRIVING,
        },
    ],
    placeID: '',
    name: '',
    latestID: 1,
    currentMarker: currentMarkerDefaultState,
    googleObjects: {},
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
        case ActionType.LOAD_GOOGLE:
            return {
                ...state,
                googleObjects: {
                    directionsService: action.payload.directionsService,
                    map: action.payload.map,
                },
            };
        default:
            return state;
    }
};

export default reducer;
