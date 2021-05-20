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
                styles={[
                    {
                        elementType: 'geometry',
                        stylers: [{ color: '#242f3e' }],
                    },
                    {
                        elementType: 'labels.text.stroke',
                        stylers: [{ color: '#242f3e' }],
                    },
                    {
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#746855' }],
                    },
                    {
                        featureType: 'administrative.locality',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }],
                    },
                    {
                        featureType: 'poi',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }],
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [{ color: '#263c3f' }],
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#6b9a76' }],
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{ color: '#38414e' }],
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#212a37' }],
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#9ca5b3' }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{ color: '#746855' }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#1f2835' }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#f3d19c' }],
                    },
                    {
                        featureType: 'transit',
                        elementType: 'geometry',
                        stylers: [{ color: '#2f3948' }],
                    },
                    {
                        featureType: 'transit.station',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }],
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{ color: '#17263c' }],
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#515c6d' }],
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.stroke',
                        stylers: [{ color: '#17263c' }],
                    },
                ]}
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
