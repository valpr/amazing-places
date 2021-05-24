import {
    Callout,
    Card,
    Button,
    Intent,
    Icon,
    IconSize,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CustomMarker } from '../state';
import { useActions } from '../hooks/useActions';

const CurrentRoute: React.FC = () => {
    const { route } = useTypedSelector((state) => state.vacations);
    const { setCurrentMarker, deleteMarker, clearRoute, chooseTravelMode } =
        useActions();
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
                        <Icon
                            iconSize={IconSize.LARGE}
                            icon={IconNames.WALK}
                            intent={
                                marker.travelMode === travelMode.WALKING
                                    ? Intent.SUCCESS
                                    : Intent.NONE
                            }
                            onClick={() =>
                                onClickTravelMode(marker.id, travelMode.WALKING)
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
                                onClickTravelMode(marker.id, travelMode.DRIVING)
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
                                onClickTravelMode(marker.id, travelMode.TRANSIT)
                            }></Icon>

                        {/* TODO: Add icon choices for travel to the next node
                            DRIVING: taxi
                            BICYCLInG: Cycle-merge two wheelers together
                            Two wheeler
                            Walking: Walk
                            Transit: train

                        */}
                        <Button onClick={() => onClick(marker)}>
                            See location
                        </Button>
                        <Button onClick={() => onClickDelete(marker)}>
                            Delete this location
                        </Button>
                    </Card>
                );
            })}
            <Button onClick={onClickClear}>Clear the current route</Button>
        </div>
    );
};

export default CurrentRoute;
