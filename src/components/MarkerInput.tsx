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
import { GoogleAPI } from 'google-maps-react';
import GooglePlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-google-places-autocomplete';

interface IProps {
    google: GoogleAPI;
}

const MarkerInput: React.FC<IProps> = ({ google }: IProps) => {
    const { createMarker, setCurrentMarker, editMarker } = useActions();
    const { currentMarker, latestID } = useTypedSelector(
        (state) => state.vacations,
    );

    const onClick = () => {
        if (
            currentMarker &&
            currentMarker.id &&
            currentMarker.position &&
            currentMarker.position.lat &&
            currentMarker.position.lng
        ) {
            editMarker(currentMarker);
            console.log(currentMarker);
        } else if (currentMarker && currentMarker.position) {
            createMarker({
                id: latestID + 1,
                position: currentMarker.position,
                description: currentMarker?.description || '',
                title: currentMarker?.title || '',
            });
        }
    };

    const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMarker({
            ...currentMarker,
            title: e.target.value,
        });
    };

    const setAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMarker({
            ...currentMarker,
            address: e.target.value,
        });
    };

    const searchAddress = (e: {
        label: string;
        value: {
            place_id: string;
        };
    }) => {
        //set address, maybe get description from places API, and move map as well
        //store place ID, if found
        geocodeByAddress(e.label)
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setCurrentMarker({
                    ...currentMarker,
                    address: e.label,
                    placeID: e.value.place_id,
                    position: {
                        lat,
                        lng,
                    },
                });
                console.log(currentMarker);
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
            <FormGroup label="Address" labelFor="Address">
                <InputGroup
                    placeholder="Address"
                    large
                    value={currentMarker?.address}
                    onChange={(e) => setAddress(e)}
                />
            </FormGroup>
            <FormGroup label="Search Address" labelFor="SearchAddress">
                <GooglePlacesAutocomplete
                    selectProps={{
                        id: 'SearchAddress',
                        onChange: searchAddress,
                    }}
                    minLengthAutocomplete={3}
                    debounce={500}
                />
            </FormGroup>

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
                    disabled={true}
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
                    disabled={true}
                />
            </FormGroup>

            <Button className="submitDestination" onClick={onClick}>
                {currentMarker?.id ? 'Edit' : 'Submit'}
            </Button>
        </Card>
    );
};

export default MarkerInput;
