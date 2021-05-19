import { ActionType } from '../action-types';

export interface Marker {
    position: Position;
    description: string;
    title: string;
    author?: string;
    duration?: Date;
    id: number;
}

export interface Position {
    lat: number;
    lng: number;
}

export interface tentativePosition {
    lat?: number;
    lng?: number;
}

interface CreateMarkerAction {
    type: ActionType.CREATE_MARKER;
    payload: Marker;
}

interface DeleteMarkerAction {
    type: ActionType.DELETE_MARKER;
    payload: number;
}

interface ModifyMarkerAction {
    type: ActionType.EDIT_MARKER;
    payload: Partial<Marker>;
}

interface SetCurrentMarker {
    type: ActionType.SET_CURRENT_MARKER;
    payload: Position | tentativePosition | undefined;
}

export type Action =
    | ModifyMarkerAction
    | DeleteMarkerAction
    | CreateMarkerAction
    | SetCurrentMarker;
