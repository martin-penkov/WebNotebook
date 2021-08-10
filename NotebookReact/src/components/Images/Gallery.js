import Photo from './Photo'
import { useEffect, useState } from 'react'
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


    return(
        <div>
            <div className="imageUploader">
                <input type="file"
                    id="avatar" name="avatar"
                    accept="image/png, image/jpeg"/>
                <Button color="inherit" onClick={(e) => imageService.uploadFromFileManager(e)}>Upload</Button>
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
                        <Button autoFocus color="red" onClick={handleClose}>
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