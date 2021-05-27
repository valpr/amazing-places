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
    category?: Categories;
    photoreference?: string;
}

export enum Categories {
    WORK = 1, //OFFICE
    RESTAURANT = 2, //GLASS
    SLEEP = 3, //MOON
    ACTIVITY = 4, // MOUNTAIN
    SHOPPING = 5, //SHOPPING cart
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

interface ChangeCategory {
    type: ActionType.CHANGE_CATEGORY;
    payload: {
        id: number;
        category: Categories;
    };
}

interface GetPlaceDetails {
    type: ActionType.GET_PLACE_DETAILS;
    payload: {
        id: number;
        place_id: string;
        photoreference?: string;
        description: string;
    };
}

export type Action =
    | ModifyMarkerAction
    | DeleteMarkerAction
    | CreateMarkerAction
    | SetCurrentMarker
    | ClearRoute
    | ChangeTravelMode
    | LoadGoogle
    | ChangeCategory
    | GetPlaceDetails;
