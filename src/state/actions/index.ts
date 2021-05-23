import { ActionType } from '../action-types';

export interface CustomMarker {
    position: Position;
    description: string;
    title: string;
    author?: string;
    duration?: Date;
    id: number;
    placeID?: string;
    address?: string;
}

export interface Position {
    lat: number;
    lng: number;
}

interface CreateMarkerAction {
    type: ActionType.CREATE_MARKER;
    payload: CustomMarker;
}

interface DeleteMarkerAction {
    type: ActionType.DELETE_MARKER;
    payload: CustomMarker;
}

interface ModifyMarkerAction {
    type: ActionType.EDIT_MARKER;
    payload: Partial<CustomMarker>;
}

interface SetCurrentMarker {
    type: ActionType.SET_CURRENT_MARKER;
    payload: Partial<CustomMarker> | undefined;
}

export type Action =
    | ModifyMarkerAction
    | DeleteMarkerAction
    | CreateMarkerAction
    | SetCurrentMarker;
