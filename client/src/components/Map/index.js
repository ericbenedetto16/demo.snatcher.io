import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

const containerStyle = {
    width: '400px',
    height: '400px',
};

export const Map = ({ lat, lng, zoom }) => (
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

Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
};
