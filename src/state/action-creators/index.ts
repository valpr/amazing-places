import { ActionType } from '../action-types';
import { Action, Categories, CustomMarker } from '../actions';
import { Dispatch } from 'redux';
import {
    getGooglePlaceDetails,
    getGooglePlacePhotos,
} from '../../services/googleService';

const RICH = false; //places photos are expensive calls...

export const createMarker = (marker: CustomMarker) => {
    return async (dispatch: Dispatch<Action>): Promise<void> => {
        //will be async later
        dispatch({
            type: ActionType.CREATE_MARKER,
            payload: marker,
        });
    };
};

export const setCurrentMarker = (
    position: Partial<CustomMarker> | undefined,
) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.SET_CURRENT_MARKER,
            payload: position,
        });
    };
};

export const editMarker = (markerSelected: Partial<CustomMarker>) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.EDIT_MARKER,
            payload: markerSelected,
        });
    };
};

export const deleteMarker = (markerToDelete: CustomMarker) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.DELETE_MARKER,
            payload: markerToDelete,
        });
    };
};

export const clearRoute = () => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.CLEAR_ROUTE,
        });
    };
};

export const chooseTravelMode = (
    id: number,
    travelMode: google.maps.TravelMode,
) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.CHANGE_TRAVEL_MODE,
            payload: {
                id,
                TravelMode: travelMode,
            },
        });
    };
};

export const loadGoogle = (
    map: google.maps.Map<Element>,
    directionsService: google.maps.DirectionsService,
) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.LOAD_GOOGLE,
            payload: {
                map: map,
                directionsService: directionsService,
            },
        });
    };
};

export const changeCategory = (id: number, category: Categories) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.CHANGE_CATEGORY,
            payload: {
                id,
                category,
            },
        });
    };
};

export const searchPlace = (place_id: string) => {
    return async (dispatch: Dispatch<Action>): Promise<void> => {
        const details = await getGooglePlaceDetails(place_id);
        const newDescription = `${details.website}
        ${details.formatted_phone_number}
        ${details.business_status}`;

        dispatch({
            type: ActionType.SET_CURRENT_MARKER,
            payload: {
                place_id,
                description: `${newDescription}` || '',
                photoreference: details.photos
                    ? details.photos[0].photo_reference
                    : '',
            },
        });
    };
};

export const getPlaceDetails = (id: number, place_id: string) => {
    return async (dispatch: Dispatch<Action>): Promise<void> => {
        const details = await getGooglePlaceDetails(place_id);
        if (details?.photos && RICH) {
            await getGooglePlacePhotos(details.photos[0].photo_reference);
        }

        const newDescription = `${details.website}
        ${details.formatted_phone_number}
        ${details.business_status}`;

        dispatch({
            type: ActionType.GET_PLACE_DETAILS,
            payload: {
                id,
                place_id,
                description: `${newDescription}` || '',
                photoreference: details.photos
                    ? details.photos[0].photo_reference
                    : '',
            },
        });
    };
};
