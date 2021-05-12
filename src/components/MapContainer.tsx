import { Map, GoogleApiWrapper } from 'google-maps-react';

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
    console.log(process.env.REACT_APP_API_KEY);
    return <div>
        <Map google={google}
        style={mapStyle}
        initialCenter={
            {
                lat: -1.2884,
                lng: 36.8233
            }
        }>
        </Map>
        Hi, this is map container.
    </div>
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_API_KEY}` ?? ''
})(MapContainer);