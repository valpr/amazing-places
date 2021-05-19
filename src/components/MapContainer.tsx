/** @jsxImportSource @emotion/react */
import {
    Map,
    GoogleApiWrapper,
    Marker,
    GoogleAPI,
    mapEventHandler,
} from 'google-maps-react';
import React from 'react';
import { css } from '@emotion/react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

interface propShape {
    google: GoogleAPI;
    loaded: boolean;
}

const MapContainer: React.FC<propShape> = ({ google, loaded }: propShape) => {
    const { setCurrentMarker } = useActions();
    const { route, currentMarker } = useTypedSelector(
        (state) => state.vacations,
    );

    if (!loaded) {
        return <div>loading</div>;
    }

    const handleClick: mapEventHandler = (
        _mapProps,
        _map,
        event: { latLng: { lat: () => number; lng: () => number } },
    ) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setCurrentMarker(newMarker);
    };

    const onMarkerClick = () => {
        setCurrentMarker(undefined);
    };

    return (
        <div
            css={css`
                margin-top: 200px;
            `}
            className="Map">
            <Map
                google={google}
                zoom={10}
                onClick={handleClick}
                initialCenter={{
                    lat: -1.2884,
                    lng: 22,
                }}
                disableDefaultUI>
                {currentMarker &&
                typeof currentMarker.lat !== 'undefined' &&
                typeof currentMarker.lng !== 'undefined' ? (
                    <Marker
                        onClick={onMarkerClick}
                        position={{
                            lat: currentMarker.lat,
                            lng: currentMarker.lng,
                        }}
                    />
                ) : null}
                {route.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{
                            lat: marker.position.lat,
                            lng: marker.position.lng,
                        }}
                        title={marker.title}></Marker>
                ))}
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: `${process.env['REACT_APP_API_KEY']}` ?? '',
})(MapContainer);
