import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

export const ClickChart = ({ clicks }) => {
    // Process Clicks into Map
    let data = new Map();

    clicks.forEach(({ dateAccessed }) => {
        const d = new Date(dateAccessed);
        d.setDate(d.getDate() + 1);
        const formattedDate = d.toLocaleDateString();
        if (data.has(formattedDate)) {
            data.set(formattedDate, data.get(formattedDate) + 1);
        } else {
            data.set(formattedDate, 1);
        }
    });

    data = new Map(
        [...data.entries()].sort((a, b) => new Date(a[0]) - new Date(b[0]))
    );

    // Add Any Empty Days
    let dates = Array.from(data.keys());

    const lowerDate = new Date(dates[0]);
    const upperDate = new Date(dates[dates.length - 1]);

    if (lowerDate.toLocaleDateString() !== upperDate.toLocaleDateString()) {
        const curr = lowerDate; // Start Filling From Lower to Upper Bound
        while (curr.toLocaleDateString() !== upperDate.toLocaleDateString()) {
            if (!data.has(curr.toLocaleDateString())) {
                data.set(curr.toLocaleDateString(), 0);
            }
            curr.setDate(curr.getDate() + 1);
        }
    }

    data = new Map(
        [...data.entries()].sort((a, b) => new Date(a[0]) - new Date(b[0]))
    );

    dates = Array.from(data.keys());

    const upperBoundClicks = Math.max(Array.from(data.values())) + 1;

    const opts = {
        chart: {
            id: 'click-to-time-chart',
            offsetY: 10,
            events: {
                beforeZoom(ctx) {
                    // we need to clear the range as we only need it on the iniital load.
                    ctx.w.config.xaxis.range = undefined;
                },
            },
        },
        xaxis: {
            categories: dates,
            title: {
                text: 'Date',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000000',
                    fontSize: '12px',
                    fontFamily: 'Roboto',
                    fontWeight: 600,
                    cssClass: 'yaxis-title',
                },
            },
        },
        noData: {
            text: 'No Clicks',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: '#000000',
                fontSize: '14px',
                fontFamily: 'Roboto',
            },
        },
        yaxis: {
            min: 0,
            max: upperBoundClicks,
            tickAmount: upperBoundClicks,
            title: {
                text: 'Clicks',
                rotate: -90,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000000',
                    fontSize: '12px',
                    fontFamily: 'Roboto',
                    fontWeight: 600,
                    cssClass: 'yaxis-title',
                },
            },
        },
        series: [{ name: 'Clicks', data: Array.from(data.values()) }],
    };

    const series = [
        {
            name: 'Clicks',
            data: Array.from(data.values()),
        },
    ];

    return <Chart options={opts} series={series} type='line' height={500} />;
};

ClickChart.propTypes = {
    clicks: PropTypes.arrayOf(PropTypes.any).isRequired,
};
