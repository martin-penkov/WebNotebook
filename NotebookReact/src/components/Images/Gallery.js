import Photo from './Photo'
import { useEffect, useState, useRef } from 'react'
import { imageService } from '../../services/imageService'
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: "auto",
      height: "auto"
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)"
    },
    appBar: {
      position: "relative"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    deleteBtn: {
        backgroundColor: "#c44b3e",
        color: "#f5f5f5",
        marginLeft: "1rem"
    },
    input: {
        display: 'none'
    }
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
return <Slide direction="up" ref={ref} {...props} />;
});



export default function Gallery(){
    const classes = useStyles();
    const [selectedTile, setSelectedTile] = useState(null);
    const [images, setImages] = useState([])


    useEffect(() => {
        setImageFunc()
    }, [])

    async function setImageFunc() {
        var data = await imageService.getUserImages()
        setImages(data)
    }


    const handleClickOpen = tile => {
        setSelectedTile(tile);
        console.log("clicked");
        console.log(tile);
    };
    
      const handleClose = () => {
        setSelectedTile(null);
    };

    async function handleDelete(){
        await imageService.removeImage(selectedTile.id);
        setImageFunc()
        //disable del button
    }

    async function handleUpload(e, refreshFunction){
        imageService.uploadFromFileManager(e, refreshFunction)
    }

    return(
        <div>
            <div className="imageUploader">
                <label >
                    <Button onClick={(e) => handleUpload(e, setImageFunc)} variant="contained" color="primary" component="span">
                    Upload
                    </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
            </div>
            <div className={classes.root}>
                <GridList cols={3}>
                    className={classes.gridList}
                    {images.map(image => (
                    <GridListTile key={image.id}>
                        <img src={image.url}/>
                        <GridListTileBar
                        actionIcon={
                            <IconButton
                            className={classes.icon}
                            value={image.id}
                            onClick={() => handleClickOpen(image)}
                            >
                            <InfoIcon />
                            </IconButton>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
                <Dialog
                    fullScreen
                    open={selectedTile !== null}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Image
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Download
                        </Button>
                        <Button
                            className={classes.deleteBtn}
                            variant="contained"
                            color="#c44b3e"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete()}
                        >
                            Delete
                        </Button>
                    </Toolbar>
                    </AppBar>

                    {selectedTile && (
                    <img src={selectedTile.url}/>
                    )}
                </Dialog>
                </div>
           {/* {images.length !== 0 ? 
           (images.map((url) => <Photo source={url}/>))
            : "No images for this user!"
            } */}
        </div>
    )
}