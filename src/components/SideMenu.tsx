import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
    Intent,
    TextArea,
    InputGroup,
    NumericInput,
    Card,
    Button,
} from '@blueprintjs/core';
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
        <Card interactive elevation={2} className="SideMenu">
            <InputGroup
                placeholder="Title"
                large
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
                placeholder="Enter a description.."
                growVertically
                large
                intent={Intent.PRIMARY}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <NumericInput
                placeholder="Latitude"
                type="number"
                value={position?.lat}
                onChange={(e) => setPosition(e, 'lat')}
            />
            <NumericInput
                placeholder="Longitude"
                type="number"
                value={position?.lng}
                onChange={(e) => setPosition(e, 'lng')}
            />
            <Button onClick={onClick}>Submit</Button>
        </Card>
    );
};

export default SideMenu;
