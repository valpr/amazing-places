import { Callout, Card, Button, Intent } from '@blueprintjs/core';
import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CustomMarker } from '../state';
import { useActions } from '../hooks/useActions';

const CurrentRoute: React.FC = () => {
    const { route } = useTypedSelector((state) => state.vacations);
    const { setCurrentMarker, deleteMarker } = useActions();
    const onClick = (marker: CustomMarker) => {
        setCurrentMarker(marker);
    };

    const onClickDelete = (marker: CustomMarker) => {
        deleteMarker(marker);
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
                        <Button onClick={() => onClick(marker)}>
                            See location
                        </Button>
                        <Button onClick={() => onClickDelete(marker)}>
                            Delete this location
                        </Button>
                    </Card>
                );
            })}
        </div>
    );
};

export default CurrentRoute;
