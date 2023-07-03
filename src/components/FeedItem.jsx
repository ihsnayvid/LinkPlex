import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography, Button, TextField } from '@mui/material';
import { Favorite, Chat, Delete } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";
import { collection, query, where, getDocs, doc, deleteDoc ,getDoc ,setDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';

const DeleteButton = styled(Delete)`
  cursor:pointer;
  &:hover{
    scale:1.5;
    transition:0.3s;
  }
`;

const StyledBox = styled(Box)`
  user-select: none;
  display: flex;
  background-color: #F5E9CF;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid lightgray;
  border-radius: 8px;
  width: 100%;
  max-width: 450px; /* Added max-width to limit the width on larger screens */
  margin-bottom: 16px;
  margin-top: 60px;
  box-shadow: 0.7rem 0.7rem rgb(26, 26, 26);
  border: 4px solid rgb(39, 39, 39);
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 90%; /* Adjust the width for smaller screens */
    margin-top: 16px; /* Reduce the top margin on smaller screens */
  }
`;


// const StyledBox = styled(Box)`
//   user-select: none;
//   display: flex;
//   background-color:#F5E9CF;
//   flex-direction: column;
//   overflow:hidden;
//   border: 1px solid lightgray;
//   border-radius: 8px;
//   width: 450px;
//   margin-bottom: 16px;
//   margin-top: 60px;
//   box-shadow: 0.7rem 0.7rem rgb(26,26,26);
//   border:4px solid rgb(39,39,39); 
//   margin-left: auto;
//   margin-right: auto;
// `;

const UserImage = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor:pointer;
  transition:0.3s;
  margin-right: 8px;
`;

const LikeIcon = styled(Favorite)`
  cursor:pointer;
  &:hover{
    scale:1.5;
    transition:0.3s;
  }
`;

const CommentIcon = styled(Chat)`
  color: #4C4B16;
  &:hover{
    color: #FF6F61;
    scale:1.5;
    transition:0.3s;
  }
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

const getTimeString = (timestamp) => {
  const currentTime = new Date();
  const postTime = new Date(timestamp);
  const diffTime = currentTime - postTime;

  if (diffTime < 60000) {
    return 'just now';
  } else if (diffTime < 60 * 60000) {
    const minutes = Math.floor(diffTime / 60000);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffTime < 24 * 60 * 60000) {
    const hours = Math.floor(diffTime / (60 * 60000));
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffTime < 7 * 24 * 60 * 60000) {
    const days = Math.floor(diffTime / (24 * 60 * 60000));
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (diffTime < 30 * 24 * 60 * 60000) {
    const weeks = Math.floor(diffTime / (7 * 24 * 60 * 60000));
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffTime < 12 * 30 * 24 * 60 * 60000) {
    const months = Math.floor(diffTime / (30 * 24 * 60 * 60000));
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffTime / (12 * 30 * 24 * 60 * 60000));
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

const FeedItem = ({ item }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { description, email, id, links, name, photoURL, tags, title, time } = item;
  const [user] = useAuthState(auth);
  const isUserPost = user && user.email === email;
  const timeString = getTimeString(time);

  useEffect(() => {
    const fetchLikeState = async () => {
      try {
        const userId = user?.email;
        const postId = id;

        const likeDocRef = doc(db, "likes", `${userId}_${postId}`);
        const likeDocSnapshot = await getDoc(likeDocRef);
        setIsLiked(likeDocSnapshot.exists());

        const likesQuery = query(collection(db, 'likes'), where('postId', '==', postId));
        const likesQuerySnapshot = await getDocs(likesQuery);

        setLikesCount(likesQuerySnapshot.size);
      } catch (error) {
        console.log("Error fetching like state:", error);
      }
    };

    const fetchCommentsCount = async () => {
      try {
        const postId = id;

        const commentsQuery = query(collection(db, 'Comments'), where('postId', '==', postId));
        const commentsQuerySnapshot = await getDocs(commentsQuery);

        setCommentsCount(commentsQuerySnapshot.size);
      } catch (error) {
        console.log("Error fetching comments count:", error);
      }
    };

    fetchLikeState();
    fetchCommentsCount();
  }, [item]);

  const toggleLike = async () => {
    const userId = user?.email;
    const postId = id;

    if (isLiked) {
      try {
        await deleteDoc(doc(db, "likes", `${userId}_${postId}`));

        setIsLiked(false);
        setLikesCount(likesCount - 1);
      } catch (error) {
        // console.error("Error removing like:", error);
      }
    } else {
      try {
        await setDoc(doc(db, "likes", `${userId}_${postId}`), {
          email: userId,
          postId: postId
        });

        setIsLiked(true);
        setLikesCount(likesCount + 1);
      } catch (error) {
        console.add("Error adding like:", error);
      }
    }
  };

  const handleDoubleClick = () => {
    toggleLike();
  };

  const handleDelete = async () => {
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
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <StyledBox onDoubleClick={handleDoubleClick}>
      <ToastContainer />
      <HeaderBox display="flex" alignItems="center" justifyContent="space-between" marginBottom={1}>
        <Box display="flex" alignItems="center">
          <UserImage src={photoURL} alt="User" />
          <Box sx={{display:"flex",flexDirection:"column"}}>
            <Link style={{ color: "black" }} to={`/profile/${encodeURIComponent(email)}/${encodeURIComponent(name)}/${encodeURIComponent(photoURL)}`}>
              <Typography style={{ textDecoration: "none", cursor: "pointer" }} variant="body1">{name}</Typography>
            </Link>
            <Typography variant="body2">{timeString}</Typography>
          </Box>
        </Box>
        {isUserPost && <DeleteButton onClick={handleDelete} />}
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
        {likesCount}
        <LikeIcon
          onClick={toggleLike}
          sx={{ marginRight: '8px' }}
          color={isLiked ? 'error' : 'disabled'}
          size="small"
          aria-label="Like"
        />
        {commentsCount}
        <Link to={`/Comments/${encodeURIComponent(id)}`}>
          <CommentIcon />
        </Link>
      </ToolBox>
    </StyledBox>
  );
};

export default FeedItem;
