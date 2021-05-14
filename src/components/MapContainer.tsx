import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useState } from 'react';

const mapStyle = {
    width: '100%',
    height: '100%'
}

interface props {
    google: any;
    loaded: any;
}

interface MarkerObject {
    lat: number;
    lng: number;
}

const MapContainer:React.FC<props> = ({google, loaded}) => {
    const [markerList, setMarkerList] = useState<MarkerObject[]>([]);

    if (!loaded) {
        return <div>
            loading
        </div>
    }

    const handleClick = (_google: any, _map: any, {latLng}: {latLng: {lat: Function, lng: Function}}) => {
        const newMarker = {
            lat: latLng.lat(),
            lng: latLng.lng()
        };
        setMarkerList([...markerList, newMarker]);

    }

    return <div>
        <Map google={google}
        zoom={10}
        style={mapStyle}
        onClick={
            handleClick
        }
        initialCenter={
            {
                lat: -1.2884,
                lng: 22
            }
        }>
            {markerList.map(marker => <Marker key={marker.lat} position={{lat: marker.lat, lng: marker.lng}}></Marker>)}
        </Map>
    </div>
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_API_KEY}` ?? ''
})(MapContainer);