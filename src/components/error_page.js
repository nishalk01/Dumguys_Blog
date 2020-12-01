import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop:"20%"
  },
  media: {
    height: 140,
  },
});

 
function ErrorPage() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Article not found
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            The Article your looking for could not be found please check if your typed proper url or try searching in search bar above
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={()=>{window.location.href="/"}}>
         Go to Home
        </Button>
      </CardActions>
    </Card>
  );
}
export default ErrorPage