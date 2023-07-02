import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import {
  collection,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import FeedItem from './FeedItem';
import {
  Box,
  Typography,
  styled,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import {  Delete } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const CommentsBox = styled(Box)`
  width:50%;
  padding:10px;
  border-radius:10px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background:white;
  box-shadow: 0.7rem 0.7rem rgb(26,26,26);
  border:4px solid rgb(39,39,39); 
`;

const CommentText = styled(Typography)`
  flex-grow: 1;
`;

const CommentAuthor = styled(Typography)`
  font-weight: bold;
  margin-right: 8px;
`;

const Comments = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [cisLoading, setcIsLoading] = useState(true);


  useEffect(() => {
    const fetchPost = async () => {
      const postId = decodeURIComponent(id);
      const docRef = doc(db, 'Post', postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({...docSnap.data(),id: docSnap.id});
      }
    };
    fetchPost().then(() => {
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const postId = decodeURIComponent(id);
      const commentsQuery = query(
        collection(db, 'Comments'),
        where('postId', '==', postId)
      );
      const querySnapshot = await getDocs(commentsQuery);
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(fetchedComments);
    };
    fetchComments().then(() => {
      setcIsLoading(false);
    }).catch((error) => {
      setcIsLoading(false);
    });
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // User is not logged in, handle accordingly
      return;
    }

    const commentData = {
      userId: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      postId: decodeURIComponent(id),
      comment: commentText,
    };

    try {
      const docRef = await addDoc(collection(db, 'Comments'), commentData);
      const newComment = { id: docRef.id, ...commentData };
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      // console.error('Error adding comment: ', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'Comments', commentId));
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      // console.error('Error deleting comment: ', error);
    }
  };

  return (
    <Box marginTop={"10vh"}>
        {isLoading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50vh' }}>
        <BounceLoader color="#F6FA70" size={100} />
      </Box>
        ) : (
          <>
            {post ? (
              <>
                <FeedItem item={post} />
                {/* Render other comments components or additional functionality */}
                <Box my={2}
                  sx={{
                      display:"flex",
                      flexDirection:"column",
                      justifyContent:"center",
                      alignItems:"center",
                    }}
                >
                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  {comments.length === 0 && (
                    <Typography variant="body2">No comments yet.</Typography>
                  )}
                  {
                    cisLoading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '80vh' }}>
                        <BounceLoader color="#F6FA70" size={100} />
                      </Box>
                    ):(
                      <>
                        {comments.map((comment) => (
                      

                          <CommentsBox key={comment.id} mb={2}>
                            <Box
                              component="img"
                              sx={{
                                height: 50,
                                width: 50,
                                objectFit: 'cover',
                                borderRadius: '50%',
                              }}
                              src={comment.photoURL}
                            />
                            <Link to={`/profile/${encodeURIComponent(comment.email)}/${encodeURIComponent(comment.name)}/${encodeURIComponent(comment.photoURL)}`}>                
                            <CommentAuthor>{comment.name}</CommentAuthor>
                            </Link>
                            <CommentText variant="body1">{comment.comment}</CommentText>
                            {user && user.uid === comment.userId && (
                              <IconButton
                                color="inherit"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                <Delete />
                              </IconButton>
                            )}
                          </CommentsBox>
                        ))}
                      </>
                    )
                  }
                </Box>
                {user && (
                  <Box>
                    <form style={{
                      display:"flex",
                      flexDirection:"row",
                      justifyContent:"center",
                          overflow:"hidden"
                    }} onSubmit={handleCommentSubmit}>
                      <TextField
                        sx={{
                          width:"45%",
                          background:"white", 
                        }}
                        variant="outlined"
                        placeholder="Write a comment..."
                        fullWidth
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Button sx={{background:"#40128B"}} type="submit" variant="contained"  mt={1}>
                        Submit
                      </Button>
                    </form>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ padding: '16px' }}>
                <Typography variant="body1">Loading post...</Typography>
              </Box>
            )}
          </>
        )}
    </Box>
  );
};

export default Comments;
