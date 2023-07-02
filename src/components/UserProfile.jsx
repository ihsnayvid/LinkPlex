import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Box, Typography } from '@mui/material';
import FeedItem from './FeedItem';
import UserBoxY from './UserBoxY';


const UserProfile = () => {
	const [userPosts, setUserPosts] = useState([]);
	const [liked, setLiked] = useState([]);
	const [likedPosts, setLikedPosts] = useState([]);

	const [user] = useAuthState(auth);


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
	}

	const fetchLikedPosts = async () => {
		if (user) {
			const userEmail = user.email;
			const likedCollectionRef = collection(db, 'likes');

			try {
				// Query the posts collection to fetch posts by the current user's email
				const userPostsQuery = query(likedCollectionRef, where('email', '==', userEmail));
				const querySnapshot = await getDocs(userPostsQuery);

				// Extract the post data from the query snapshot
				const posts = querySnapshot.docs.map((doc) => doc.data());
				setLiked(posts);
			}
			catch (error) {
				console.log('Error fetching liked posts:', error);
			}
		}
	};

	const getPost = async (postId) => {
		const postCollectionRef = collection(db, 'Post');

		try {
			// Query the posts collection to fetch posts by the current user's email
			const userPostsQuery = query(postCollectionRef, where('id', '==', postId));
			const querySnapshot = await getDocs(userPostsQuery);

			// Extract the post data from the query snapshot
			const posts = querySnapshot.docs.map((doc) => doc.data());
			console.log(posts);
			setLikedPosts((prevLikedPosts) => [...prevLikedPosts, ...posts]);
		}
		catch (error) {
			console.log('Error fetching liked posts:', error);
		}
	}

	useEffect(() => {
		// console.log("effect from user profile");
		(async () => {			

			if (user) {
				await fetchUserPosts();
				// console.log(userPosts);
			}
		})();
		
		//Fetch User's Liked Posts
		(async () => {
			
			if (user) {
				await fetchLikedPosts();
				// console.log(liked);

				// liked.map(async (post, index) => {
				// 	await getPost(post.postId);
				// 	// console.log(post.postId);
				// });
				// console.log(likedPosts);

				const likedPostIds = likedPosts.map((post) => post.postId);
				const likedPostsDetails = [];

				for (const postId of likedPostIds) {
					console.log("ID is ", postId);
					try {
						// Query the posts collection to fetch posts by their ID
						const postQuery = query(collection(db, 'Post'), where('id', '==', postId));
						const postQuerySnapshot = await getDocs(postQuery);
						const post = postQuerySnapshot.docs.map((doc) => doc.data());

						likedPostsDetails.push(post);
						console.log(post);
					} catch (error) {
						console.log('Error fetching liked post details:', error);
					}
				}

				setLikedPosts(likedPostsDetails.flat());
				// console.log(likedPostsDetails);
				// console.log(likedPosts);
			}
		})();

	}, []);


	return (
		<Box>
			<UserBoxY photoURL={user?.photoURL} displayName={user?.displayName} email={user?.email} />
			<Box display="flex" flexWrap="wrap" >
				{userPosts && userPosts.length > 0 ? (
					userPosts?.map((item, index) => <FeedItem key={index} item={item} />)
				) : (
					<Typography variant="body1" marginTop={10}>
						No Posts available.
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default UserProfile;
