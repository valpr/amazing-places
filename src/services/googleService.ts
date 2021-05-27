import axios from 'axios';
const API_KEY = `${process.env['REACT_APP_API_KEY']}` ?? '';

const instance = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/',
});

interface GooglePhotosArray {
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: [];
}

interface GoogleDetailsFormat {
    formatted_phone_number?: string;
    website?: string;
    business_status?: string;
    photos?: GooglePhotosArray[];
}

export const getGooglePlaceDetails = async (
    id: string,
): Promise<GoogleDetailsFormat> => {
    const url = `place/details/json`;
    const result: GoogleDetailsFormat = await instance.get(url, {
        params: {
            place_id: id,
            key: API_KEY,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With',
        },
    });
    return result;
};

export const getGooglePlacePhotos = async (
    photoReference: string,
): Promise<unknown> => {
    const maxWidth = 200;
    const maxHeight = 200;
    const url = `place/photo?maxwidth=${maxWidth}&maxheight=${maxHeight}&photoreference=${photoReference}&key=${API_KEY}`;
    const image = await instance.get(url);
    return image;
};
