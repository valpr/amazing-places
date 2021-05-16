import { ActionType } from '../action-types';

export interface Marker {
    lat: number;
    lng: number;
    description: string;
    title: string;
    author?: string;
    duration?: Date;
    id: number;
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

export type Action =
    | ModifyMarkerAction
    | DeleteMarkerAction
    | CreateMarkerAction;
