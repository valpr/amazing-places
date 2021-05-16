import MapContainer from './MapContainer';
import React from 'react';
import SideMenu from './SideMenu';
import '../App.css';
import { Provider } from 'react-redux';
import { store } from '../state';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <SideMenu />
                <MapContainer />
            </div>
        </Provider>
    );
};

export default App;
