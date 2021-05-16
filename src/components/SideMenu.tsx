import React from 'react';
import { useActions } from '../hooks/useActions';
//maybe this can slide in eventually
const SideMenu: React.FC = () => {
    const { createMarker } = useActions();
    const onClick = () => {
        //test out CreateMarker action here
        createMarker({
            id: 0,
            lat: -1.3884,
            lng: 22,
            description: 'wow!',
            title: 'test',
        });
    };

    return (
        <div className="SideMenu">
            Title: <input></input>
            Description
            <textarea></textarea>
            lat:
            <input />
            lng:
            <input />
            <button onClick={onClick}>Submit</button>
        </div>
    );
};

export default SideMenu;
