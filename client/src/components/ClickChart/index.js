import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

export const ClickChart = ({ clicks }) => {
    // Process Clicks into Map
    const data = new Map();

    clicks.forEach(({ dateAccessed }) => {
        const d = new Date(dateAccessed);
        const formattedDate = d.toLocaleDateString();
        if (data.has(formattedDate)) {
            data.set(formattedDate, data.get(formattedDate) + 1);
        } else {
            data.set(formattedDate, 1);
        }
    });

    // Add Any Empty Days
    let dates = Array.from(data.keys()).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const lowerDate = new Date(dates[0]);
    const upperDate = new Date(dates[dates.length - 1]);

    if (lowerDate.getTime() !== upperDate.getTime()) {
        const curr = lowerDate;
        while (lowerDate.getTime() < upperDate.getTime()) {
            curr.setDate(curr.getDate() + 1);
            dates.push(curr);
            data.set(curr.toLocaleDateString(), 0);
        }
    }

    dates = Array.from(data.keys()).sort((a, b) => new Date(a) - new Date(b));

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
