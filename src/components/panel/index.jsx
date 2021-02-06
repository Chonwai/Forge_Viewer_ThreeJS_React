import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './index.css';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

function Panel({ setSize }) {
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [deep, setDeep] = useState(1);
    const updateModel = () => {
        setSize(width, height, deep);
    };
    const handleWidthChange = (event, newValue) => {
        setWidth(newValue);
        updateModel();
    };
    const handleHeightChange = (event, newValue) => {
        setHeight(newValue);
        updateModel();
    };
    const handleDeepChange = (event, newValue) => {
        setDeep(newValue);
        updateModel();
    };
    return (
        <div className="panel-component w-full h-full flex flex-col">
            <div className="p-4">
                <Typography className="text-left" gutterBottom>
                    Width
                </Typography>
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    min={0.5}
                    max={2}
                    step={0.05}
                    defaultValue={1}
                    value={width}
                    onChange={handleWidthChange}
                />
            </div>
            <div className="p-4">
                <Typography className="text-left" gutterBottom>
                    Height
                </Typography>
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    min={0.5}
                    max={2}
                    step={0.05}
                    defaultValue={1}
                    value={height}
                    onChange={handleHeightChange}
                />
            </div>
            <div className="p-4">
                <Typography className="text-left" gutterBottom>
                    Deep
                </Typography>
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    min={0.5}
                    max={2}
                    step={0.05}
                    defaultValue={1}
                    value={deep}
                    onChange={handleDeepChange}
                />
            </div>
        </div>
    );
}

export default Panel;
