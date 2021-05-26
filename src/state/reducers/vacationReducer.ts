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
                lat: 44.9553554,
                lng: -75.0291221,
            },
            description: 'First place',
            title: 'The Town That Was Burned for Science: Aultsville',
            travelMode: google?.maps?.TravelMode?.DRIVING,
        },
        {
            id: 2,
            position: {
                lat: 45.0058298,
                lng: -72.1354939,
            },
            description: 'Second Place',
            title: 'The US-Canada Border Splits This Road Down The Middle',
            travelMode: google?.maps?.TravelMode?.DRIVING,
        },
        {
            id: 3,
            position: {
                lat: 45.766667,
                lng: -71.934835,
            },
            description: 'A Town Called Asbestos',
            title: 'A Town Called Asbestos',
            travelMode: google?.maps?.TravelMode?.DRIVING,
        },
        {
            id: 4,
            position: {
                lat: 62.499722,
                lng: -114.358612,
            },
            description: 'Freezing 200,000 Tons of Lethal Arsenic Dust',
            title: 'Freezing 200,000 Tons of Lethal Arsenic Dust',
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
        case ActionType.CHANGE_CATEGORY:
            return {
                ...state,
                route: state.route.map((marker) =>
                    marker.id === action.payload?.id
                        ? { ...marker, category: action.payload.category }
                        : marker,
                ),
            };
        default:
            return state;
    }
};

export default reducer;
