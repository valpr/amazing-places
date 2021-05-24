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
