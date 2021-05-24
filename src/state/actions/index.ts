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
    travelMode?: google.maps.TravelMode;
    directionsRenderer?: google.maps.DirectionsRenderer;
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

interface ClearRoute {
    type: ActionType.CLEAR_ROUTE;
}

interface ChangeTravelMode {
    type: ActionType.CHANGE_TRAVEL_MODE;
    payload: {
        id: number;
        TravelMode: google.maps.TravelMode;
    };
}

interface LoadGoogle {
    type: ActionType.LOAD_GOOGLE;
    payload: {
        map: google.maps.Map<Element>;
        directionsService: google.maps.DirectionsService;
    };
}

export type Action =
    | ModifyMarkerAction
    | DeleteMarkerAction
    | CreateMarkerAction
    | SetCurrentMarker
    | ClearRoute
    | ChangeTravelMode
    | LoadGoogle;
