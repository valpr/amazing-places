import {
    Callout,
    Card,
    Button,
    Intent,
    Icon,
    IconSize,
    ButtonGroup,
    Divider,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Categories, CustomMarker } from '../state';
import { useActions } from '../hooks/useActions';
import { editMarker } from '../state/action-creators';

const CurrentRoute: React.FC = () => {
    const { route, googleObjects } = useTypedSelector(
        (state) => state.vacations,
    );
    const {
        setCurrentMarker,
        deleteMarker,
        clearRoute,
        chooseTravelMode,
        changeCategory,
    } = useActions();
    const travelMode = google.maps.TravelMode;

    const onClick = (marker: CustomMarker) => {
        setCurrentMarker(marker);
    };

    const onClickDelete = (marker: CustomMarker) => {
        deleteMarker(marker);
    };

    const onClickClear = () => {
        clearRoute();
    };

    const onClickTravelMode = (
        id: number,
        travelMode: google.maps.TravelMode,
    ) => {
        chooseTravelMode(id, travelMode);
    };

    const onClickCategory = (id: number, category: Categories) => {
        changeCategory(id, category);
    };

    const onClickRecalculate = () => {
        if (!googleObjects.map) return;
        if (!googleObjects.directionsService) return;
        const map = googleObjects.map;
        for (let i = 0; i < route.length - 1; i++) {
            const directionsDisplay =
                route[i].directionsRenderer ??
                new google.maps.DirectionsRenderer();
            editMarker({ ...route[i], directionsRenderer: directionsDisplay });
            googleObjects.directionsService.route(
                {
                    origin: {
                        lat: route[i].position.lat,
                        lng: route[i].position.lng,
                    },
                    destination: {
                        lat: route[i + 1].position.lat,
                        lng: route[i + 1].position.lng,
                    },
                    travelMode:
                        route[i]?.travelMode ||
                        google.maps.TravelMode['DRIVING'],
                },
                (response, status) => {
                    if (status == 'OK') {
                        directionsDisplay.setMap(map);
                        directionsDisplay.setDirections(response);
                    } else {
                        alert('Directions Request failed due to ' + status);
                    }
                },
            );
        }
        return;
    };

    return (
        <div className="RouteList">
            {route.map((marker) => {
                return (
                    <Card key={marker.id}>
                        <Callout
                            title={`ID: ${marker.id} | ${marker.title}`}
                            intent={Intent.PRIMARY}>
                            {marker.description}
                        </Callout>
                        <div className="travelModes">
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.WALK}
                                intent={
                                    marker.travelMode === travelMode.WALKING
                                        ? Intent.SUCCESS
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickTravelMode(
                                        marker.id,
                                        travelMode.WALKING,
                                    )
                                }></Icon>
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.CYCLE}
                                intent={
                                    marker.travelMode === travelMode.TWO_WHEELER
                                        ? Intent.SUCCESS
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickTravelMode(
                                        marker.id,
                                        travelMode.TWO_WHEELER,
                                    )
                                }></Icon>
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.TAXI}
                                intent={
                                    marker.travelMode === travelMode.DRIVING
                                        ? Intent.SUCCESS
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickTravelMode(
                                        marker.id,
                                        travelMode.DRIVING,
                                    )
                                }></Icon>
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.TRAIN}
                                intent={
                                    marker.travelMode === travelMode.TRANSIT
                                        ? Intent.SUCCESS
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickTravelMode(
                                        marker.id,
                                        travelMode.TRANSIT,
                                    )
                                }></Icon>
                        </div>
                        <Divider />
                        <div className="categories">
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.OFFICE}
                                intent={
                                    marker?.category === Categories.WORK
                                        ? Intent.PRIMARY
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickCategory(marker.id, Categories.WORK)
                                }></Icon>
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.GLASS}
                                intent={
                                    marker?.category === Categories.RESTAURANT
                                        ? Intent.PRIMARY
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickCategory(
                                        marker.id,
                                        Categories.RESTAURANT,
                                    )
                                }></Icon>
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.MOUNTAIN}
                                intent={
                                    marker?.category === Categories.ACTIVITY
                                        ? Intent.PRIMARY
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickCategory(
                                        marker.id,
                                        Categories.ACTIVITY,
                                    )
                                }></Icon>
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.MOON}
                                intent={
                                    marker?.category === Categories.SLEEP
                                        ? Intent.PRIMARY
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickCategory(marker.id, Categories.SLEEP)
                                }></Icon>
                            <Icon
                                iconSize={IconSize.LARGE}
                                icon={IconNames.SHOPPING_CART}
                                intent={
                                    marker?.category === Categories.SHOPPING
                                        ? Intent.PRIMARY
                                        : Intent.NONE
                                }
                                onClick={() =>
                                    onClickCategory(
                                        marker.id,
                                        Categories.SHOPPING,
                                    )
                                }></Icon>
                        </div>
                        <ButtonGroup fill large>
                            <Button onClick={() => onClick(marker)}>
                                See location
                            </Button>
                            <Button onClick={() => onClickDelete(marker)}>
                                Delete this location
                            </Button>
                        </ButtonGroup>
                    </Card>
                );
            })}
            <Button onClick={onClickClear}>Clear the current route</Button>
            <Button onClick={onClickRecalculate}>Recalculate directions</Button>
        </div>
    );
};

export default CurrentRoute;
