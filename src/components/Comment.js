import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import AlignItemsList from './comment_list'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import BASE_URL from './Baseurl';


const Comments=()=>{
    const [comment,setComment]=useState("");//for inputted comment
    const [toast,setToast]=useState(false);//for showing toast when comment is empty
    const [nameinput,setNameinput]=useState(false);//for showing name input field
    const [comments,setComments]=useState([]);//for getting list of comments from server
    const [name,setName]=useState("");//getting user name
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    
      setToast(false);
    };

    useEffect(()=>{

      const thePath=window.location.href;
      let parts = thePath.split('/'); //make this into util function
      let lastSegment = parts.pop() || parts.pop(); 
      let unique_id="";
      if(localStorage.getItem("unique_id")){
       unique_id=localStorage.getItem("unique_id");
    }
      axios.get(BASE_URL+"api/comments/"+lastSegment+"/",{
        params: {
          ID: unique_id
        }
      })//add unique_id check
      .then(res_comment=>{
        let comm_data=res_comment.data;
        if(comm_data.unique_id_get_comment){
          localStorage.setItem("unique_id",comm_data.unique_id_get_comment);
        }
        setComments(comm_data.comment_data);
        setName(comm_data.commentor_name);
        

      })
      .catch(err=>{
        console.log(err);
      })
    },[])

    const handleChange=(e)=>{
        const comment_input_val=e.target.value;
        setComment(comment_input_val);
         
    }

    const handleClick=(e)=>{
      var val=!comment || comment.length === 0 || /^\s*$/.test(comment)//check if message is empty
      var name_check=!name || name.length === 0 || /^\s*$/.test(name)// make this a function in utils
      if(!name_check){
      if(!val){
        const thePath=window.location.href;
        let parts = thePath.split('/'); //make this into util function
        let lastSegment = parts.pop() || parts.pop(); 
      axios.post(BASE_URL+"api/comments_post/"+lastSegment+"/",{
          "commentor_name":name,
          "ID":String(localStorage.getItem("unique_id")), //handle comment without unique_id
          "comment":String(comment), 
        })
     .then(res=>{
         const newcomment={"commentor_name":name,"comment":comment}
         setComments(comments=>[newcomment,...comments])
         setNameinput(false);
         const target_text_field=document.getElementById("outlined-textarea")
         target_text_field.value=""
         setComment("");
      })
      .catch(err=>{console.log(err)})
      }
      else{
       setToast(true);

      }
    }
    else{
        setNameinput(true);
    }
    }

    const handlename=(e)=>{
      setName(e.target.value);
    }
    return(
        <div>
          {toast?(
          <Snackbar open={toast} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Comment cannot be empty
          </Alert>
        </Snackbar>
                ):(<span></span>)}

        {nameinput?(
         <TextField id="outlined-basic" onChange={handlename} label="Name" placeholder="Enter your name..." variant="outlined" />
        ):(<span></span>)}
        <TextField
        onChange={(e)=>{handleChange(e)}}
        id="outlined-textarea"
        placeholder="Type your comment"
        multiline
        variant="outlined"
        style={{width:"70%"}}
      />
       <Button
        onClick={(e)=>{handleClick(e)}}
        variant="contained"
        color="primary"
        endIcon={<SendIcon/>}
      >
        Send
      </Button>
      <AlignItemsList comm_add={comments}/>
      </div>
    )
}

export default Comments