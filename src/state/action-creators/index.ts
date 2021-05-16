import { ActionType } from '../action-types';
import { Action, Marker } from '../actions';
import { Dispatch } from 'redux';

export const createMarker = (marker: Marker) => {
    return (dispatch: Dispatch<Action>): void => {
        //will be async later
        dispatch({
            type: ActionType.CREATE_MARKER,
            payload: marker,
        });
    };
};
