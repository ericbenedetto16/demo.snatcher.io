import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const containerStyle = {
    width: '400px',
    height: '400px',
};

export const Map = ({ lat, lng, zoom }) => (
    <div style={containerStyle}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
            defaultCenter={{ lat: 40.75, lng: -74 }}
            center={[lat, lng]}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
        />
    </div>
);

Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
};
