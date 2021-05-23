import React from 'react';
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
    const { currentMarker, latestID } = useTypedSelector(
        (state) => state.vacations,
    );
    const onClick = () => {
        //test out CreateMarker action here
        if (currentMarker && currentMarker.position)
            createMarker({
                id: latestID + 1,
                position: currentMarker.position,
                description: currentMarker?.description || '',
                title: currentMarker?.title || '',
            });
    };

    const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMarker({
            ...currentMarker,
            title: e.target.value,
        });
    };

    const setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentMarker({
            ...currentMarker,
            description: e.target.value,
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
                ...currentMarker,

                position: {
                    lng: currentMarker?.position?.lng
                        ? currentMarker.position.lng
                        : 0,
                    lat: value,
                },
            });
        } else if (!isNaN(value) && indicator === 'lng') {
            setCurrentMarker({
                ...currentMarker,
                position: {
                    lat: currentMarker?.position?.lat
                        ? currentMarker.position.lat
                        : 0,
                    lng: value,
                },
            });
        }
    };

    return (
        <Card interactive elevation={2} className="MarkerInput">
            <InputGroup
                placeholder="Title"
                large
                value={currentMarker?.title}
                onChange={(e) => setTitle(e)}
            />
            <TextArea
                className="desc"
                placeholder="Enter a description.."
                growVertically
                large
                fill
                intent={Intent.PRIMARY}
                value={currentMarker?.description}
                onChange={(e) => setDescription(e)}
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
                    value={currentMarker?.position?.lat}
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
                    value={currentMarker?.position?.lng}
                />
            </FormGroup>

            <Button className="submitDestination" onClick={onClick}>
                Submit
            </Button>
        </Card>
    );
};

export default MarkerInput;
