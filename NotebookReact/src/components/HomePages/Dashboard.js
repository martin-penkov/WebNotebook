import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import img from "../../static/paperBg.png"
import CreateNotebook from '../Notebook/CreateNotebook';
import { notebookService } from '../../services/notebookService';
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: 0
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [activateCreate, setActivate] = useState(false)
  const [userBooks, setuserBooks] = useState();

  useEffect(() => {
    setNotebookData()
  }, [])

async function setNotebookData(){
  let data = await notebookService.getUserItems()
  setuserBooks(data)
}

  return (
    <React.Fragment>
      <CssBaseline />
      
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
              Your Library
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>

            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => {
                    setActivate(!activateCreate)
                    notebookService.createNotebook()
                    }}>
                    Create
                  </Button>
                  <CreateNotebook
                  activate={activateCreate}>
                  </CreateNotebook>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Settings
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>{console.log(userBooks)}
            {userBooks === undefined ? <CircularProgress /> : userBooks.map((Notebook) => (
              <Grid item key={Notebook} xs={12} sm= {6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {Notebook.name}
                    </Typography>
                  </CardContent>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {Notebook.dateCreated}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}