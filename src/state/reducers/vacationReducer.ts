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
            description:
                'The St Lawrence Burns were a series of deliberate fires in the soon-to-be-demolished village of Aultsville, Ontario, which was due to be flooded to make way for the St Lawrence Seaway. The results changed the way buildings are constructed around the world, and saved lives.',
            title: 'The Town That Was Burned for Science: Aultsville',
            travelMode: google?.maps?.TravelMode?.DRIVING,
            youtubeID: 'https://www.youtube.com/watch?v=DWYthXD14pw',
        },
        {
            id: 2,
            position: {
                lat: 45.0058298,
                lng: -72.1354939,
            },
            description:
                "Rue Canusa (or Canusa Avenue) is a street that's split in two by a border: the northern part is in Stanstead, Canada, and the southern part is in Derby Line, USA — and border crossings here aren't as easy as they used to be.",
            title: 'The US-Canada Border Splits This Road Down The Middle',
            travelMode: google?.maps?.TravelMode?.DRIVING,
            youtubeID: 'https://www.youtube.com/watch?v=EocJm3Dry4E',
        },
        {
            id: 3,
            position: {
                lat: 45.766667,
                lng: -71.934835,
            },
            description: `In Quebec, Canada, there's a town called Asbestos. It's an alarming name, one that conjures up images of lung disease and mesothelioma. So why haven't they changed it? [Update, October 2020: they've changed it! It's now Val-Des-Sources. https://www.npr.org/2020/10/20/925820... ] Dr Jessica van Horssen's book, 'A Town Called Asbestos', was invaluable for my research. Its ISBN is 9780774828420, and it can be ordered from most libraries and bookstores.`,
            title: 'A Town Called Asbestos',
            travelMode: google?.maps?.TravelMode?.DRIVING,
            youtubeID: 'https://www.youtube.com/watch?v=CB3LJdMYzrQ',
        },
        {
            id: 4,
            position: {
                lat: 62.499722,
                lng: -114.358612,
            },
            description:
                'Giant Mine sits near Yellowknife, in the Northwest Territories of Canada. Once it was a productive gold mine, but after the gold ran out, the mining company went bankrupt and left the government to clean up the mess: enough arsenic trioxide dust to kill everyone on Earth. The solution: freezing it, at least for now.',
            title: 'Freezing 200,000 Tons of Lethal Arsenic Dust',
            travelMode: google?.maps?.TravelMode?.DRIVING,
            youtubeID: 'https://www.youtube.com/watch?v=E4nZDSLdIiM',
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
        case ActionType.GET_PLACE_DETAILS:
            return {
                ...state,
                route: state.route.map((marker) =>
                    marker.id === action.payload?.id
                        ? {
                              ...marker,
                              photoreference: action.payload?.photoreference,
                              placeID: action.payload.place_id,
                              description:
                                  action.payload?.description ||
                                  marker.description,
                          }
                        : marker,
                ),
            };
        default:
            return state;
    }
};

export default reducer;
