import React, { useState,useEffect } from 'react'
import axios from 'axios'

import Fab from '@material-ui/core/Fab';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BASE_URL from './Baseurl';


const LikeButton=()=>{
    const [likestatus,setlikeStatus]=useState(false);
    const [slug,setSlug]=useState("");

    useEffect(()=>{
      let  unique_id_for_check="";
      const thePath=window.location.href;
      let parts = thePath.split('/');
      let lastSegment = parts.pop() || parts.pop(); 
      setSlug(lastSegment)
      if(localStorage.getItem("unique_id")){
          unique_id_for_check=localStorage.getItem("unique_id");
      }

      axios.get(BASE_URL+"api/check_like/"+lastSegment+"/",{
        params: {
          ID: unique_id_for_check
        }
      })
      .then(res=>{
          let { check_like,unique_id }=res.data;
          setlikeStatus(check_like);
          if(unique_id){
            localStorage.setItem("unique_id",unique_id);
          }
      })
      .catch(err=>{
          console.log(err);
      })
    },[])

    const sendLike=()=>{
        axios.post(BASE_URL+"api/like/"+slug+"/",{
           "ID":localStorage.getItem("unique_id")
        })
          .then(res=>{
                const {like_status}=res.data
                setlikeStatus(like_status)
              
             })
             .catch(err=>{
               console.log(err)
             })
     }
    const changecolor=likestatus?({color:"blue"}):null
    return(
        
        <Fab color="primary"   onClick={()=>{ sendLike()}} style={{position:"fixed",marginLeft:"80%",marginTop:450}} aria-label="add">
        <ThumbUpIcon style={{ zIndex:3 }} style={changecolor}/>
        </Fab>
        
    )
}


export default LikeButton



