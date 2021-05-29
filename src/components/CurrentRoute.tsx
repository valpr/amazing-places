import {
    Callout,
    Card,
    Button,
    Intent,
    ButtonGroup,
    Divider,
    Position,
    Menu,
    MenuItem,
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Categories, CustomMarker } from '../state';
import { useActions } from '../hooks/useActions';
import { editMarker } from '../state/action-creators';
import YoutubeEmbed from './YoutubeEmbed';

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

    const renderTravelModeIcons = (marker: CustomMarker) => {
        return (
            <Menu>
                <MenuItem
                    text="Walking"
                    icon={IconNames.WALK}
                    intent={
                        marker.travelMode === travelMode.WALKING
                            ? Intent.SUCCESS
                            : Intent.NONE
                    }
                    onClick={() =>
                        onClickTravelMode(marker.id, travelMode.WALKING)
                    }
                />
                <MenuItem
                    text="Cycling"
                    icon={IconNames.CYCLE}
                    intent={
                        marker.travelMode === travelMode.TWO_WHEELER
                            ? Intent.SUCCESS
                            : Intent.NONE
                    }
                    onClick={() =>
                        onClickTravelMode(marker.id, travelMode.TWO_WHEELER)
                    }
                />
                <MenuItem
                    text="Driving"
                    icon={IconNames.TAXI}
                    intent={
                        marker.travelMode === travelMode.DRIVING
                            ? Intent.SUCCESS
                            : Intent.NONE
                    }
                    onClick={() =>
                        onClickTravelMode(marker.id, travelMode.DRIVING)
                    }
                />
                <MenuItem
                    text="Transit"
                    icon={IconNames.TRAIN}
                    intent={
                        marker.travelMode === travelMode.TRANSIT
                            ? Intent.SUCCESS
                            : Intent.NONE
                    }
                    onClick={() =>
                        onClickTravelMode(marker.id, travelMode.TRANSIT)
                    }
                />
            </Menu>
        );
    };

    const renderPlaceClassification = (marker: CustomMarker) => {
        return (
            <Menu>
                <MenuItem
                    text="Work"
                    icon={IconNames.OFFICE}
                    intent={
                        marker?.category === Categories.WORK
                            ? Intent.PRIMARY
                            : Intent.NONE
                    }
                    onClick={() => onClickCategory(marker.id, Categories.WORK)}
                />
                <MenuItem
                    text="Restaurants"
                    icon={IconNames.GLASS}
                    intent={
                        marker?.category === Categories.RESTAURANT
                            ? Intent.PRIMARY
                            : Intent.NONE
                    }
                    onClick={() =>
                        onClickCategory(marker.id, Categories.RESTAURANT)
                    }
                />
                <MenuItem
                    text="Activity"
                    icon={IconNames.MOUNTAIN}
                    intent={
                        marker?.category === Categories.ACTIVITY
                            ? Intent.PRIMARY
                            : Intent.NONE
                    }
                    onClick={() =>
                        onClickCategory(marker.id, Categories.ACTIVITY)
                    }
                />
                <MenuItem
                    text="Sleep"
                    icon={IconNames.MOON}
                    intent={
                        marker?.category === Categories.SLEEP
                            ? Intent.PRIMARY
                            : Intent.NONE
                    }
                    onClick={() => onClickCategory(marker.id, Categories.SLEEP)}
                />
                <MenuItem
                    text="Shopping"
                    icon={IconNames.SHOPPING_CART}
                    intent={
                        marker?.category === Categories.SHOPPING
                            ? Intent.PRIMARY
                            : Intent.NONE
                    }
                    onClick={() =>
                        onClickCategory(marker.id, Categories.SHOPPING)
                    }
                />
            </Menu>
        );
    };

    return (
        <div className="RouteList">
            {route.map((marker) => {
                return (
                    <Card key={marker.id}>
                        <Callout
                            title={`ID: ${marker.id} | ${marker.title}`}
                            intent={Intent.PRIMARY}>
                            <YoutubeEmbed videoID={marker?.youtubeID || ''} />
                            {marker.description}
                        </Callout>
                        <Popover2
                            content={renderTravelModeIcons(marker)}
                            position={Position.LEFT}>
                            <Button
                                icon={
                                    marker?.travelMode === travelMode.TRANSIT
                                        ? IconNames.TRAIN
                                        : marker?.travelMode ===
                                          travelMode.DRIVING
                                        ? IconNames.TAXI
                                        : marker?.travelMode ===
                                          travelMode.TWO_WHEELER
                                        ? IconNames.CYCLE
                                        : marker?.travelMode ===
                                          travelMode.WALKING
                                        ? IconNames.WALK
                                        : IconNames.SHARE
                                }
                                text="Travel next by..."
                            />
                        </Popover2>
                        <Popover2
                            content={renderPlaceClassification(marker)}
                            position={Position.LEFT}>
                            <Button
                                icon={
                                    marker?.category === Categories.RESTAURANT
                                        ? IconNames.GLASS
                                        : marker?.category ===
                                          Categories.ACTIVITY
                                        ? IconNames.MOUNTAIN
                                        : marker?.category ===
                                          Categories.SHOPPING
                                        ? IconNames.SHOPPING_CART
                                        : marker?.category === Categories.SLEEP
                                        ? IconNames.MOON
                                        : marker?.category === Categories.WORK
                                        ? IconNames.OFFICE
                                        : IconNames.PATH
                                }
                                text="Type of place"
                            />
                        </Popover2>
                        <Divider />
                        <ButtonGroup fill>
                            <Button onClick={() => onClick(marker)}>
                                View Map
                            </Button>
                            <Button onClick={() => onClickDelete(marker)}>
                                Delete
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
