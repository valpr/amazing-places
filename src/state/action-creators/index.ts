import { ActionType } from '../action-types';
import { Action, Marker } from '../actions';
import { Dispatch } from 'redux';

export const createMarker = (marker: Marker) => {
    return async (dispatch: Dispatch<Action>): Promise<void> => {
        //will be async later
        dispatch({
            type: ActionType.CREATE_MARKER,
            payload: marker,
        });
    };
};
