import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
    paper: {
      // textAlign: 'center',
      marginTop:25,
      alignItems:"center"
    },
}));

export default function BlogCard(props){
    const classes = useStyles();
    return(
    
        <Card  className={classes.paper}>
      <CardActionArea >
      <Paper elevation={3} />
        <CardMedia
          component="img"
          alt={props.article_name}
          height="350"
          image={props.article_img}
      // for testing change this later on*
          title={props.article_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.article_name}
          </Typography>
          {/* add wat the article is about in backend extra field * */}
          <Typography variant="body2" color="textSecondary" component="p">
            {props.about_article}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

