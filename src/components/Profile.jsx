import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import FeedItem from './FeedItem';
import UserBoxY from './UserBoxY';
import { Box, Typography} from '@mui/material';


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
        <>
            <UserBoxY photoURL={userProfile} email={userEmail} displayName={userName} />
            <Box display="flex" flexWrap="wrap" >
            {userPosts && userPosts.length > 0 ? (
            userPosts?.map((item, index) => <FeedItem key={index} item={item} />)
            ) : (
            <Typography variant="body1" marginTop={10} marginX={60}>
                No Posts available.
            </Typography>
            )}
            </Box>
        </>
    )
}

export default Profile;