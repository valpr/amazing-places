import { ActionType } from '../action-types';
import { Action, CustomMarker } from '../actions';
import { Dispatch } from 'redux';

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
