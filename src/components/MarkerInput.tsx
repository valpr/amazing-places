import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
    Intent,
    TextArea,
    InputGroup,
    Card,
    Button,
    FormGroup,
    NumericInput,
} from '@blueprintjs/core';

const MarkerInput: React.FC = () => {
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
        _valueAsNumber: number,
        valueAsString: string,
        indicator: string,
    ) => {
        const value = parseFloat(valueAsString);
        if (!isNaN(value) && indicator === 'lat') {
            setCurrentMarker({
                ...position,
                lat: value,
            });
        } else if (!isNaN(value) && indicator === 'lng') {
            setCurrentMarker({
                ...position,
                lng: value,
            });
        }
    };

    return (
        <Card interactive elevation={2} className="MarkerInput">
            <InputGroup
                placeholder="Title"
                large
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
                className="desc"
                placeholder="Enter a description.."
                growVertically
                large
                fill
                intent={Intent.PRIMARY}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <FormGroup label="Latitude" labelFor="latitude">
                <NumericInput
                    id="latitude"
                    className="lat"
                    placeholder="Latitude"
                    type="number"
                    onValueChange={(num, stringVal) =>
                        setPosition(num, stringVal, 'lat')
                    }
                    minorStepSize={0.0001}
                    buttonPosition="none"
                    value={position?.lat}
                />
            </FormGroup>
            <FormGroup label="Longitude" labelFor="longitude">
                <NumericInput
                    id="longitude"
                    className="lng"
                    placeholder="Longitude"
                    type="number"
                    onValueChange={(num, stringVal) =>
                        setPosition(num, stringVal, 'lng')
                    }
                    minorStepSize={0.0001}
                    buttonPosition="none"
                    value={position?.lng}
                />
            </FormGroup>

            <Button className="submitDestination" onClick={onClick}>
                Submit
            </Button>
        </Card>
    );
};

export default MarkerInput;
