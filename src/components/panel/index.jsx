import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
import { Button, TextField } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import AuthAPI from '../../apis/auth';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    mgBorder: {
        margin: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function Panel({ setCurrentUrn }) {
    const [open, setOpen] = React.useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [length, setLength] = useState(0);
    const [thickness, setThickness] = useState(0);
    const classes = useStyles();
    const updateModel = async () => {
        // let body = {
        //     width: width,
        //     height: height,
        //     length: length,
        //     thickness: thickness,
        // };
        auth();
        handleToggle();
        // let urn = await ModelService.editModel(body);
        // setCurrentUrn(urn);
        console.log('Update!');
        handleClose();
    };
    const auth = () => {
        AuthAPI.getAccessToken();
    };
    const handleWidthChange = e => {
        setWidth(e.target.value);
    };
    const handleHeightChange = e => {
        setHeight(e.target.value);
    };
    const handleLengthChange = e => {
        setLength(e.target.value);
    };
    const handleThicknessChange = e => {
        setThickness(e.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <div className="panel-component w-full h-full flex flex-col">
            <TextField
                className={classes.mgBorder}
                id="outlined-number"
                label="Width"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                value={width}
                onChange={handleWidthChange}
            />
            <TextField
                className={classes.mgBorder}
                id="outlined-number"
                label="Height"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                value={height}
                onChange={handleHeightChange}
            />
            <TextField
                className={classes.mgBorder}
                id="outlined-number"
                label="Length"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                value={length}
                onChange={handleLengthChange}
            />
            <TextField
                className={classes.mgBorder}
                id="outlined-number"
                label="Thickness"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                value={thickness}
                onChange={handleThicknessChange}
            />
            <Button
                className={classes.mgBorder}
                variant="contained"
                color="primary"
                endIcon={<PublishIcon />}
                onClick={updateModel}
            >
                Send
            </Button>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <div className="w-screen flex flex-col justify-center items-center">
                    <CircularProgress />
                    <p>Updating...</p>
                </div>
            </Backdrop>
        </div>
    );
}

export default Panel;
