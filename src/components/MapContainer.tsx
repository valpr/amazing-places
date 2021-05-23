import {
    Map,
    GoogleApiWrapper,
    Marker,
    GoogleAPI,
    mapEventHandler,
} from 'google-maps-react';
import React from 'react';
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
        console.log('click detected');
        const newMarker = {
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            },
        };
        setCurrentMarker(newMarker);
    };

    const onMarkerClick = () => {
        setCurrentMarker(undefined);
    };

    const loadHistoryMarker = (marker: {
        id: number;
        description: string;
        title: string;
        position: { lat: number; lng: number };
    }) => {
        // setCurrentMarker(marker);
        console.log('in progress', marker);
    };

    return (
        <div className="Map">
            <Map
                google={google}
                zoom={12}
                onClick={handleClick}
                initialCenter={{
                    lat: 37.4221,
                    lng: -122.0841,
                }}
                disableDefaultUI>
                {route.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{
                            lat: marker.position.lat,
                            lng: marker.position.lng,
                        }}
                        title={marker.title}
                        onClick={() => loadHistoryMarker(marker)}></Marker>
                ))}
                {currentMarker &&
                typeof currentMarker.position?.lat !== 'undefined' &&
                typeof currentMarker.position?.lng !== 'undefined' ? (
                    <Marker
                        onClick={onMarkerClick}
                        position={{
                            lat: currentMarker.position?.lat,
                            lng: currentMarker.position?.lng,
                        }}
                    />
                ) : null}
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: `${process.env['REACT_APP_API_KEY']}` ?? '',
})(MapContainer);
