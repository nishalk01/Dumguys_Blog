import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';

// const BASE_URL="http://127.0.0.1:8000/"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export default function AlignItemsList(props) {
  const comments=props.comm_add
  const classes = useStyles();
  
  const comments_list=comments.length?(
   comments.map(comment=>{
     
     return(
    <List className={classes.root}>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar  className={classes.purple} alt={comment.commentor_name} src="/static/images/avatar/333.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={comment.commentor_name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
             {comment.comment}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
  </List>
     )}
   )):(<LinearProgress/>)


  return (
    <div style={{ position:"relative",zIndex:-1}}>
   {comments_list}
   </div>
  );
}


// export default AlignItemsList