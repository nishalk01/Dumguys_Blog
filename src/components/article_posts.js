import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import BlogCard from './card';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import BASE_URL from './Baseurl';



const ArticleList=()=>{
    
    const [posts,setPosts] = useState([]);
    let unique_id="";
    useEffect(()=>{
        //probably remove this localstorage thing
        if(localStorage.getItem("unique_id")){
            unique_id=localStorage.getItem("unique_id")//check if unique is there and get that value
        }
        axios.get(BASE_URL+"api/posts/",{
            params: {
              ID: unique_id
            }
          })
    .then(res=>{
          if(res.data.unique_id){
            localStorage.setItem("unique_id",res.data.unique_id) //if unique_id is given by server meaning no unique_id so set that value
          }   
            setPosts(res.data.data)
        })
    .catch(
            err=>{ console.log(err)}
          )
    },[])

    const article_posts=posts.length?
    (
       posts.map(post=>{
           //get rid of unique key prop error by adding id in backends
           return(
               <div key={post.id} >
                   <Link to={"/article/"+post.slug+"/"} style={{ textDecoration: 'none' }}>
                   <BlogCard article_name={post.article_name} article_img={post.image} about_article={post.article_detail} />
                   </Link>
               </div>
           )
       })    
        ):(<div><CircularProgress/></div>)
    

    return(
<div>
    <Grid container
            xs={12}
            justify="center"
            alignItems="center" >
        <Grid item md={6} style={{marginTop:50 }}>
            {article_posts} 
        </Grid>
    </Grid>
</div>
    )
}

export default ArticleList
