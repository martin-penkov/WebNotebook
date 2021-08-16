import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



export default function DatePicker(props){

    const useStyles = makeStyles((theme) => ({
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          backgroundColor: '#FFFFFF',
          width: props.customWidth
        },
      }));

    const classes = useStyles();

    return <TextField
        id="datetime-local"
        label={props.inputText}
        type="datetime-local"
        defaultValue={new Date()}
        className={classes.textField}
        onChange={(e) => props.setFunction(e.target.value)}
        InputLabelProps={{
        shrink: true,
        }}
    />
}
