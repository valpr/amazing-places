import React from 'react';
import { Card, Callout } from '@blueprintjs/core';
import YoutubeEmbed from 'react-youtube';

const AboutPage: React.FC = () => {
    return (
        <div className="about">
            <Card className="aboutcard">
                <h1>Welcome to Amazing Places</h1>
                This app is a vacation planner inspired by Tom Scott&apos;s
                series series Amazing Places that lets you search your place,
                plan a the map, customized based on travel and category.
                <YoutubeEmbed videoId={'zFiNmEWXPPM'} />
                <div className="functionalityList">
                    <Callout title="Functionalities">
                        <ul>
                            <li>Click on map to get address</li>
                            <li>
                                Click on existing markers to pull/change route
                                information
                            </li>
                            <li>
                                Create, edit, and delete existing route markers
                            </li>
                            <li>
                                Autocompleted address, which populates phone
                                number, website, and business status
                            </li>
                            <li>
                                Customize travel method between each destination
                            </li>
                            <li>Classify each destination by category</li>
                            <li>
                                Attach and view youtube links associated with
                                with each marker
                            </li>
                        </ul>
                    </Callout>
                </div>
            </Card>
        </div>
    );
};

export default AboutPage;
