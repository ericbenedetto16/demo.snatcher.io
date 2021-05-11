/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import GoogleMapReact from 'google-map-react';

const containerStyle = {
    width: '400px',
    height: '400px',
};

export const Map = ({ lat, lng, zoom }) => {
    // const center = {
    //     lat,
    //     lng,
    // };

    return (
        <div style={containerStyle}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB-tcWSQnNsVizzw_gjC_01O52xS9KXHkM' }}
                defaultCenter={{ lat: 40.75, lng: -74 }}
                center={[lat, lng]}
                zoom={zoom}
                yesIWantToUseGoogleMapApiInternals
            />
        </div>
    );
};
