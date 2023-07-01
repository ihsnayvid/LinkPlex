import React, { useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Profile = () => {
    const { email, name, photoURL } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    
    const userEmail = decodeURIComponent(email);
    const userName = decodeURIComponent(name);
    const userProfile = decodeURIComponent(photoURL);
    console.log('user email is', userEmail);
    console.log('user name is', userName);
    console.log('user photoURL is', userProfile);
    useEffect(() => {
        (async () => {

            const getUser = async () => {
                if (userEmail) {
                    const postsCollectionRef = collection(db, 'Post');
                    console.log(userEmail);
                    try {
                        // Query the posts collection to fetch posts by the current user's email
                        const userPostsQuery = query(postsCollectionRef, where('email', '==', userEmail));
                        const querySnapshot = await getDocs(userPostsQuery);

                        // Extract the post data from the query snapshot
                        const posts = querySnapshot.docs.map((doc) => doc.data());
                        setUserPosts(posts);
                        console.log('fetched the users posts');
                    }
                    catch (error) {
                        console.log('Error fetching user posts:', error);
                    }
                }
            };

            if (userEmail) {
                await getUser();
                console.log(userPosts);
            }
        })();
    }, []);

    return (
        <div style={{ marginTop: "100px" }}>
  {userPosts.map((post, index) => (
    <div key={index}>
      <h3>{post.title}</h3>
      <p>{post.name}</p>
      <p>Photo URL: {userProfile}</p>
    </div>
  ))}
</div>

    )
}

export default Profile;