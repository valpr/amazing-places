import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
//maybe this can slide in eventually
const SideMenu: React.FC = () => {
    const { createMarker, setCurrentMarker } = useActions();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const position = useTypedSelector(
        ({ vacations }) => vacations.currentMarker,
    );
    const onClick = () => {
        //test out CreateMarker action here
        if (position && position.lat && position.lng)
            createMarker({
                id: Math.random(),
                position: {
                    lat: position.lat,
                    lng: position.lng,
                },
                description,
                title,
            });
    };

    const setPosition = (
        e: React.ChangeEvent<HTMLElement>,
        indicator: string,
    ) => {
        if (
            typeof e.currentTarget.nodeValue === 'string' &&
            indicator === 'lat'
        ) {
            const value = parseInt(e.currentTarget.nodeValue);
            setCurrentMarker({
                ...position,
                lat: value,
            });
        }
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
                value={position?.lat}
                onChange={(e) => setPosition(e, 'lat')}
            />
            lng:
            <input
                type="number"
                value={position?.lng}
                onChange={(e) => setPosition(e, 'lng')}
            />
            <button onClick={onClick}>Submit</button>
        </div>
    );
};

export default SideMenu;
