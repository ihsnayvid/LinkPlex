import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography, Button, TextField } from '@mui/material';
import { Favorite, Chat, Delete } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';



const DeleteButton = styled(Delete)`
  cursor:pointer;
`;


const StyledBox = styled(Box)`
  display: flex;
  background-color:#F5E9CF;
  flex-direction: column;
  overflow:hidden;
  border: 1px solid lightgray;
  border-radius: 8px;
  width: 450px;
  margin-bottom: 16px;
  margin-top: 60px;
  box-shadow: 0.7rem 0.7rem rgb(26,26,26);
    border:4px solid rgb(39,39,39); 
  margin-left: auto;
  margin-right: auto;
`;

const UserImage = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const LikeIcon = styled(Favorite)`
  color: red;
`;

const CommentIcon = styled(Chat)`
  color: black;
`;

const ToolBox = styled(Box)`
  display: flex;
  width: 100%;
`;
const HeaderBox = styled(Box)`
  padding:10px;
  margin:0;
  background:#FF6F61;
`



const FeedItem = ({ item }) => {
    const { description, email, id, links, name, photoURL, tags, title } = item;
    const [user] = useAuthState(auth);
    const isUserPost = user && user.email === email;
    const handleDelete =async () => {
      console.log('haha')
      await deleteDoc(doc(db, "Post", id));
      toast.error('Post Deleted !', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setTimeout(()=>{
          window.location.reload();
        },3000)
    };
  
    return (
      <StyledBox>
      <ToastContainer />
        <HeaderBox display="flex" alignItems="center" justifyContent="space-between" marginBottom={1}>
        <Box display="flex" alignItems="center">
          <UserImage src={photoURL} alt="User" />
          <Typography variant="body1">{name}</Typography>
        </Box>
        {isUserPost && <DeleteButton onClick={handleDelete} />} {/* Render the delete button only for the user's post */}
        </HeaderBox>
        <Typography marginX={2} variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box marginBottom={1} marginX={2}>
          {links?.map((link, index) => (
            <Button
              key={index}
              variant="outlined"
              color="primary"
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: '8px', marginBottom: '8px' }}
            >
              {link.name}
            </Button>
          ))}
        </Box>
        <Box marginBottom={1} marginX={2}>
          {tags?.map((tag, index) => (
            <Typography
              key={index}
              variant="body2"
              component="span"
              style={{ marginRight: '8px' }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
        <Typography variant="body1" marginX={2} paragraph>
          {description}
        </Typography>
        <ToolBox paddingY={2} paddingX={1} borderTop={1}>
          <LikeIcon sx={{ marginRight: '8px' }} />
          <CommentIcon />
        </ToolBox>
      </StyledBox>
    );
  };
  
  export default FeedItem