import React from 'react';
import PropTypes from 'prop-types';
import RoomIcon from '@material-ui/icons/Room';

const radiusStyle = {
    width: '30px',
    height: '30px',
    backgroundColor: 'rgba(20,20,20,0.4)',
    borderRadius: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
};

const roomStyle = {
    position: 'absolute',
    transform: 'translate(14%, 0%)',
};

// eslint-disable-next-line no-unused-vars
export const Marker = ({ lat, lng }) => (
    <div style={radiusStyle}><RoomIcon color='secondary' style={roomStyle} /></div>
);

Marker.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
};
