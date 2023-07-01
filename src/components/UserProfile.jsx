import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Box, Typography, styled } from '@mui/material';
import FeedItem from './FeedItem';

const UserBox = styled(Box)`
  height:45vh;
  display: flex;
  align-items: center;
  justify-content:space-around;
  background:#FFD0D0;
  margin-top:30px;
  border-bottom:4px solid rgb(39,39,39);
`;

const UserImageCircle = styled('img')`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 8px;
`;

const UserInfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;



const UserProfile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [user] = useAuthState(auth);

  useEffect( () => {
    console.log("effect from user profile");
    (async () => {

      const fetchUserPosts = async () => {
        if (user) {
          const userEmail = user.email;
          const postsCollectionRef = collection(db, 'Post');
  
          try {
            // Query the posts collection to fetch posts by the current user's email
            const userPostsQuery = query(postsCollectionRef, where('email', '==', userEmail));
            const querySnapshot = await getDocs(userPostsQuery);        

            // Extract the post data from the query snapshot
            const posts = querySnapshot.docs.map((doc) => doc.data());
            setUserPosts(posts);
          } 
          catch (error) {
            console.log('Error fetching user posts:', error);
          }
      }
    };
  
    if (user) {
      await fetchUserPosts();
      console.log(userPosts);
    }
    })();
}, []);


  return (
    <div>
    <Box>
    <UserBox>
      <UserImageCircle src={user?.photoURL} alt="User" />
      <UserInfoBox>
        <Typography variant="h4" >{user?.email}</Typography>
        <Typography variant="h6">{user?.displayName}</Typography>
      </UserInfoBox>
    </UserBox>
    <Box display="flex" flexWrap="wrap" >
    {userPosts && userPosts.length > 0 ? (
        userPosts?.map((item, index) => <FeedItem key={index} item={item} />)
      ) : (
        <Typography variant="body1" marginTop={10}>
          No data available.
        </Typography>
      )}
    </Box>
    </Box>
    </div>
  );
};

export default UserProfile;
