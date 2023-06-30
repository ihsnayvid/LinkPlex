import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        const userEmail = user.email;
        const postsCollectionRef = collection(db, 'posts');

        try {
          // Query the posts collection to fetch posts by the current user's email
          const userPostsQuery = query(postsCollectionRef, where('email', '==', userEmail));
          const querySnapshot = await getDocs(userPostsQuery);          
          // Extract the post data from the query snapshot
          const posts = querySnapshot.docs.map((doc) => doc.data());
          setUserPosts(posts);
          console.log('i have set the posts->updated state');
          console.log('Posts Fetching Successful!!');
          
        } 
        catch (error) {
          console.log('Error fetching user posts:', error);
        }
    }
  };

  if (user) {
    fetchUserPosts();
    console.log("after fetching i'm here ");
  }
}, [user]);


  const updatePosts = async () =>{

  }
  return (
    <div>
      {/* <h2>Posts by Current User</h2>
      {userPosts.length > 0 ? (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found for the current user.</p>
      )} */}
    </div>
  );
};

export default UserProfile;
