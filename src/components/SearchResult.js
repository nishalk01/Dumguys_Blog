import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import BlogCard from './card';
import { Link } from 'react-router-dom';
import BASE_URL from './Baseurl';

const SearchPage=(props)=>{
    const  [results,setResults]=useState([]);
    useEffect(()=>{
        
        axios.get(BASE_URL+"api/article_search/?search="+String(props.match.params.search_slug))
        .then(res=>{
            setResults(res.data);
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const article_results=results.length?
    (
        results.map(result=>{
           //get rid of unique key prop error by adding id in backends
           return(
               <div key={result.id}>
                   <Link to={"/article/"+result.slug+"/"} style={{ textDecoration: 'none' }}>
                   <BlogCard article_name={result.article_name} article_img={result.image} about_article={result.article_detail} />
                   </Link>
               </div>
           )
       })    
        ):(<div>No posts found</div>)



    return(
<div>
<Grid container
   
    justify="center"
    alignItems="center" 
    style={{marginTop:50 }}>
        <Grid item md={6}>
        {article_results}   
     </Grid>
    </Grid>
   
</div>
    )
}



export default SearchPage;