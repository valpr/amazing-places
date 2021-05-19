import { ActionType } from '../action-types';
import { Action, Marker, Position, tentativePosition } from '../actions';
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

export const setCurrentMarker = (
    position: Position | tentativePosition | undefined,
) => {
    return (dispatch: Dispatch<Action>): void => {
        dispatch({
            type: ActionType.SET_CURRENT_MARKER,
            payload: position,
        });
    };
};
