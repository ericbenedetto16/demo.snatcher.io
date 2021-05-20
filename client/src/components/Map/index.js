import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { Marker } from './marker';

export const Map = ({
    DEFAULT_CENTER, lat, lng, zoom,
}) => (
    <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={DEFAULT_CENTER}
        center={[lat, lng]}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
    >
        <Marker lat={lat} lng={lng} />
    </GoogleMapReact>
);

Map.propTypes = {
    DEFAULT_CENTER: PropTypes.objectOf(PropTypes.any).isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
};
