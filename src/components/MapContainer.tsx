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
import SideMenu from './SideMenu';

interface propShape {
    google: GoogleAPI;
    loaded: boolean;
    toggleDrawer: () => void;
    showDrawer: boolean;
}

const MapContainer: React.FC<propShape> = ({
    google,
    loaded,
    toggleDrawer,
    showDrawer,
}: propShape) => {
    const { setCurrentMarker } = useActions();
    const { route, currentMarker } = useTypedSelector(
        (state) => state.vacations,
    );

    if (!loaded) {
        return <div>loading</div>;
    }

    const geocoder = new google.maps.Geocoder();

    const handleClick: mapEventHandler = (
        _mapProps,
        _map,
        event: { latLng: { lat: () => number; lng: () => number } },
    ) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        geocoder.geocode(
            { location: { lat, lng } },
            (
                results: google.maps.GeocoderResult[],
                status: google.maps.GeocoderStatus,
            ) => {
                if (status === 'OK') {
                    let address = '';
                    let placeID = '';
                    if (results[0]) {
                        address = `${results[0].formatted_address}`;
                        placeID = results[0].place_id;
                    } else {
                        alert('No results found for your search');
                    }
                    const newMarker = {
                        title: '',
                        address,
                        position: {
                            lat: lat,
                            lng: lng,
                        },
                        placeID,
                    };
                    setCurrentMarker(newMarker);
                } else {
                    alert('Error with request: ' + status);
                }
            },
        );
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
        setCurrentMarker(marker);
    };

    return (
        <div className="Map">
            {showDrawer ? (
                <SideMenu
                    google={google}
                    toggleDrawer={toggleDrawer}
                    show={showDrawer}
                />
            ) : null}
            <Map
                google={google}
                zoom={12}
                onClick={handleClick}
                initialCenter={{
                    lat: 37.4221,
                    lng: -122.0841,
                }}
                center={
                    currentMarker?.id || currentMarker?.placeID
                        ? currentMarker?.position
                        : undefined
                }
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
                typeof currentMarker.id === 'undefined' &&
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
