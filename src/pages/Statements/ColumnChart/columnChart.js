import React from 'react';
import { shape, bool, string, arrayOf, number } from 'prop-types';
import CanvasJSReact from 'static/charts';

import classes from './columnChart.module.css';

const CanvasJsChart = CanvasJSReact.CanvasJSChart;

const ColumnChart = (props) => {
    const { options } = props;

    return (
        <div className={classes.root}>
            <CanvasJsChart options={options} />
        </div>
    );
};

export default ColumnChart;

ColumnChart.propTypes = {
    options: shape({
        title: string,
        animationEnabled: bool,
        data: arrayOf(
            shape({
                dataPoints: arrayOf(
                    shape({
                        label: string,
                        y: number,
                    })
                ),
            })
        ),
    }),
};
