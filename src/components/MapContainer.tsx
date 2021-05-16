/** @jsxImportSource @emotion/react */
import {
    Map,
    GoogleApiWrapper,
    Marker,
    GoogleAPI,
    mapEventHandler,
} from 'google-maps-react';
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface props {
    google: GoogleAPI;
    loaded: boolean;
}

interface MarkerObject {
    lat: number;
    lng: number;
}

const MapContainer: React.FC<props> = ({ google, loaded }: props) => {
    const [currentMarker, setCurrentMarker] =
        useState<MarkerObject | undefined>();
    const { route } = useTypedSelector((state) => state.vacations);

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
                {currentMarker ? (
                    <Marker onClick={onMarkerClick} position={currentMarker} />
                ) : null}
                {route.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
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
