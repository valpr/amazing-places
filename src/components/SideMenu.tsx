import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
//maybe this can slide in eventually
const SideMenu: React.FC = () => {
    const { createMarker } = useActions();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState(0);
    const onClick = () => {
        //test out CreateMarker action here
        createMarker({
            id: Math.random(),
            lat,
            lng,
            description,
            title,
        });
    };

    return (
        <div className="SideMenu">
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            Description
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            lat:
            <input
                type="number"
                value={lat}
                onChange={(e) => setLat(parseInt(e.target.value))}
            />
            lng:
            <input
                type="number"
                value={lng}
                onChange={(e) => setLng(parseInt(e.target.value))}
            />
            <button onClick={onClick}>Submit</button>
        </div>
    );
};

export default SideMenu;
