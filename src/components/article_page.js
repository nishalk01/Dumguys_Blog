import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import LikeButton from './likeButton';
import Comments from './Comment';
import Container from '@material-ui/core/Container';
import ErrorPage from './error_page';
import BASE_URL from './Baseurl';


const ArticlePage=(props)=>{
    const [blog,setBlog]=useState({});
    const [showerror,setShowerror]=useState(false);
    useEffect(()=>{
        const slug_to_url= String(props.match.params.article_slug)
        axios.get(BASE_URL+"api/article/"+slug_to_url+"/")//add unique_id thing if needed
        .then(res=>{
          setBlog(res.data)
          
        })
        .catch(err=>{
          console.log(err)
          if(err.response.status===404){
             setShowerror(true)
            }
        })
       
    },[])


    const createBlog = () => {
        return {__html: blog.article_content};
    };
    return(
        <div>
          {
          showerror?
            (<div>
              <Grid container
              justify="center"
              alignItems="center" >
                 <ErrorPage/>
              </Grid>
            </div>):
            (<div>
              <LikeButton />
             <Container maxWidth="sm">
          <Grid container item md={12}
          >
              {/* <h1></h1> */}
            <div dangerouslySetInnerHTML={createBlog()} /> 
           
          </Grid>
          </Container>
          <Container maxWidth="sm">
          <Grid  item md={12} 
          >
          <Comments/>
            </Grid>
            </Container>
            </div>)
            }
        
        </div>
     
    )


  
}

export default ArticlePage