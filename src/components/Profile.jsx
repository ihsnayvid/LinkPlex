import { BounceLoader } from 'react-spinners';
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
    const [isLoading, setIsLoading] = useState(true);

    
    const userEmail = decodeURIComponent(email);
    const userName = decodeURIComponent(name);
    const userProfile = decodeURIComponent(photoURL);
    useEffect(() => {
        (async () => {

            const getUser = async () => {
                if (userEmail) {
                    const postsCollectionRef = collection(db, 'Post');
                    try {
                        const userPostsQuery = query(postsCollectionRef, where('email', '==', userEmail));
                        const querySnapshot = await getDocs(userPostsQuery);
                        const posts = querySnapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        }));
                        // const posts = querySnapshot.docs.map((doc) => doc.data());
                        setUserPosts(posts);
                        setIsLoading(false);
                        // console.log('fetched the users posts');
                    }
                    catch (error) {
                        console.log('Error fetching user posts:', error);
                    }
                }
            };

            if (userEmail) {
                await getUser();
                // console.log(userPosts);
            }
        })();
        // console.log("hello")
    }, []);
    
    return (
        <>
        <UserBoxY photoURL={userProfile} email={userEmail} displayName={userName} />
            {isLoading ? (
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    }}
                >
                    <BounceLoader color="#F6FA70" size={200} />
                </Box>
                ) : (
                <>
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
            )}
        </>
    )
}

export default Profile;