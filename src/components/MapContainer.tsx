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
import { editMarker } from '../state/action-creators';
import { CustomMarker } from '../state';

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
    const { setCurrentMarker, loadGoogle } = useActions();
    const { route, currentMarker, googleObjects } = useTypedSelector(
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
                        description: '',
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

    const loadHistoryMarker = (marker: CustomMarker) => {
        setCurrentMarker(marker);
    };

    const renderCurrentRoute: mapEventHandler = (
        _mapProps,
        map: google.maps.Map<Element> | undefined,
    ) => {
        //TODO: each marker will have a WALKING | BIKING | DRIVING | TRANSIT property on it
        //Then we can query each route one at a time based on their transit method
        //make sure to avoid over query limits
        //have a recalculate routes button on the top bar?

        if (!map) return;
        const directionsService = new google.maps.DirectionsService();
        loadGoogle(map, directionsService);

        for (let i = 0; i < route.length - 1; i++) {
            const directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            directionsService.route(
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
                        route[0]?.travelMode ||
                        google.maps.TravelMode['DRIVING'],
                },
                (response, status) => {
                    if (status == 'OK') {
                        directionsDisplay.setDirections(response);
                        editMarker({
                            ...route[i],
                            directionsRenderer: directionsDisplay,
                        });
                    } else {
                        alert('Directions Request failed due to ' + status);
                    }
                },
            );
        }
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
                onReady={renderCurrentRoute}
                center={
                    currentMarker?.id || currentMarker?.placeID
                        ? currentMarker?.position
                        : googleObjects?.map?.getCenter().toJSON()
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
                        icon={'' + marker.id}
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
