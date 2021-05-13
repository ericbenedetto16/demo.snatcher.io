import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Map } from '../Map';

const rows = [
    {
        id: 1,
        slug: 'upzx7Saw',
        ip: '183.194.245.254',
        dateAccessed: '2021-04-14T00:14:10.300Z',
        country: 'United States',
        city: 'Staten Island',
        region: 'NY',
        postal: '10314',
        latitude: '40.6420',
        longitude: '-74.1834',
    },
    {
        id: 2,
        slug: 'ABCDE',
        ip: '183.194.245.254',
        dateAccessed: '2021-04-14T00:14:10.300Z',
        country: 'United States',
        city: 'Staten Island',
        region: 'NY',
        postal: '10314',
        latitude: '29',
        longitude: '-100',
    },
    {
        id: 3,
        slug: 'FGHI',
        ip: '183.194.245.254',
        dateAccessed: '2021-04-14T00:14:10.300Z',
        country: 'United States',
        city: 'Staten Island',
        region: 'NY',
        postal: '10314',
        latitude: '-80',
        longitude: '-74.1834',
    },
    {
        id: 4,
        slug: 'JKLMOP',
        ip: '183.194.245.254',
        dateAccessed: '2021-04-14T00:14:10.300Z',
        country: 'United States',
        city: 'Staten Island',
        region: 'NY',
        postal: '10314',
        latitude: '44.6420',
        longitude: '-72.1834',
    },
];

// id: 1,
// slug: "upzx7Saw",
// ip: "183.194.245.254",
// dateAccessed: "2021-04-14T00:14:10.300Z",
// country: "United States",
// city: "Staten Island",
// region: "NY",
// postal: "10314",
// latitude: 40.6420,
// longitude: -74.1834,
// createdAt: "2021-04-28T00:14:10.300Z",
// updatedAt: "2021-04-20T00:14:10.300Z"
const columns = [
    {
        field: 'slug',
        headerName: 'Slug',
        width: 150,
        flex: 0.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'ip',
        headerName: 'IP Adress',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'dateAccessed',
        headerName: 'Date Accessed',
        width: 150,
        flex: 1.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'country',
        headerName: 'Country',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'region',
        headerName: 'Region',
        width: 150,
        flex: 0.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'postal',
        headerName: 'Postal',
        width: 150,
        flex: 0.75,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'latitude',
        headerName: 'Latitude',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'longitude',
        headerName: 'Longitude',
        width: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
    },
];

const useStyles = makeStyles({
    root: {
        height: 400,
        width: '100%',
        '& .super-app-theme--header': {
            backgroundColor: '#e0e0e0',
        },
    },
});

export const Track = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [lat, setLat] = useState(40.75);
    const [lng, setLng] = useState(-74);

    // const async getAllData = () => {
    //     const res = await fetch(`${process.env.REACT_APP_TACKER_URL}/`);
    //     res = await res.json();

    //     if (res.success) return res.slug;

    //     return undefined;
    // };

    // const getMyData = () => {

    // };

    return (
        <div className={classes.root}>
            <DataGrid
                autoPageSize
                page={page}
                onPageChange={(params) => {
                    setPage(params.page);
                }}
                pageSize={5}
                pagination
                rows={rows}
                columns={columns}
                components={{
                    Toolbar: GridToolbar,
                }}
                onRowClick={(rowData) => {
                    // eslint-disable-next-line radix
                    setLat(Number(rowData.row.latitude));
                    // eslint-disable-next-line radix
                    setLng(Number(rowData.row.longitude));
                }}
            />
            <Map key={lat + lng} lat={lat} lng={lng} zoom={10} />
        </div>
    );
};
