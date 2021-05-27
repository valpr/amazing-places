import React from 'react';
import YouTube, { Options } from 'react-youtube';

interface IProps {
    videoID: string;
}

const YoutubeEmbed: React.FC<IProps> = ({ videoID }: IProps) => {
    const opts: Options = {
        height: '150',
        width: '200',
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
        },
    };
    if (videoID === '') {
        return (
            <React.Fragment>
                <br></br>
            </React.Fragment>
        );
    }
    return <YouTube videoId={videoID.split('?v=')[1] || ''} opts={opts} />;
};

export default YoutubeEmbed;
