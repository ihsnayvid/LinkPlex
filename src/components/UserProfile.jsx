import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
    <div style={{marginTop:"100px"}}>
      {
        userPosts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.email}</p>
          </div>
        ))
      }
    </div>
  );
};

export default UserProfile;
