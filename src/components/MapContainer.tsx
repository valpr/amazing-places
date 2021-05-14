import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyle = {
    width: '100%',
    height: '100%'
}

interface props {
    google: any;
    loaded: any;
}

const MapContainer:React.FC<props> = ({google, loaded}) => {
    
    if (!loaded) {
        return <div>
            loading
        </div>
    }
    return <div>
        <Map google={google}
        zoom={10}
        style={mapStyle}
        initialCenter={
            {
                lat: -1.2884,
                lng: 22
            }
        }>
            <Marker
                //onClick={directions}

            />
        </Map>
    </div>
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_API_KEY}` ?? ''
})(MapContainer);