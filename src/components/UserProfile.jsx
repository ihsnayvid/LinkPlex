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
				// const posts = querySnapshot.docs.map((doc) => doc.data());
				const posts = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				  }));
				setUserPosts(posts);
			}
			catch (error) {
				// console.log('Error fetching user posts:', error);
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
				// console.log('Error fetching liked posts:', error);
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
			// console.log("this is posts : ",posts)
			setLikedPosts((prevLikedPosts) => [...prevLikedPosts, ...posts]);
		}
		catch (error) {
			// console.log('Error fetching liked posts:', error);
		}
	}
	
	useEffect(() => {
		// console.log("effect from user profile");
		// console.log("user hulala ",userPosts)
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

				for (const post of liked) {
					await getPost(post.postId);
				  }
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
// import React, { useEffect, useState } from 'react';
// import { db } from '../config/firebase';
// import { auth } from "../config/firebase";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { Box, Typography, Button } from '@mui/material';
// import FeedItem from './FeedItem';
// import UserBoxY from './UserBoxY';


// const UserProfile = () => {
//   const [userPosts, setUserPosts] = useState([]);
//   const [liked, setLiked] = useState([]);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const [showLikedPosts, setShowLikedPosts] = useState(false);

//   const [user] = useAuthState(auth);

//   const fetchUserPosts = async () => {
//     if (user) {
//       const userEmail = user.email;
//       const postsCollectionRef = collection(db, 'Post');

//       try {
//         // Query the posts collection to fetch posts by the current user's email
//         const userPostsQuery = query(postsCollectionRef, where('email', '==', userEmail));
//         const querySnapshot = await getDocs(userPostsQuery);

//         // Extract the post data from the query snapshot
//         const posts = querySnapshot.docs.map((doc) => doc.data());
//         setUserPosts(posts);
//       }
//       catch (error) {
//         console.log('Error fetching user posts:', error);
//       }
//     }
//   }

//   const fetchLikedPosts = async () => {
//     if (user) {
//       const userEmail = user.email;
//       const likedCollectionRef = collection(db, 'likes');

//       try {
//         // Query the posts collection to fetch posts by the current user's email
//         const userPostsQuery = query(likedCollectionRef, where('email', '==', userEmail));
//         const querySnapshot = await getDocs(userPostsQuery);

//         // Extract the post data from the query snapshot
//         const posts = querySnapshot.docs.map((doc) => doc.data());
//         setLiked(posts);
//       }
//       catch (error) {
//         console.log('Error fetching liked posts:', error);
//       }
//     }
//   };

//   const getPost = async (postId) => {
//     const postCollectionRef = collection(db, 'Post');

//     try {
//       // Query the posts collection to fetch posts by the current user's email
//       const userPostsQuery = query(postCollectionRef, where('id', '==', postId));
//       const querySnapshot = await getDocs(userPostsQuery);

//       // Extract the post data from the query snapshot
//       const posts = querySnapshot.docs.map((doc) => doc.data());
//       setLikedPosts((prevLikedPosts) => [...prevLikedPosts, ...posts]);
//     }
//     catch (error) {
//       console.log('Error fetching liked posts:', error);
//     }
//   }

//   useEffect(() => {
//     (async () => {
//       if (user) {
//         await fetchUserPosts();
//       }
//     })();

//     (async () => {
//       if (user) {
//         await fetchLikedPosts();
//       }
//     })();
//   }, []);

//   const handleShowLikedPosts = () => {
//     setShowLikedPosts(true);
//   };

//   const handleShowUserPosts = () => {
//     setShowLikedPosts(false);
//   };

//   return (
//     <Box>
//       <UserBoxY photoURL={user?.photoURL} displayName={user?.displayName} email={user?.email} />
//       <Box display="flex" flexWrap="wrap">
//         <Button variant="contained" onClick={handleShowLikedPosts}>
//           Liked Posts
//         </Button>
//         <Button variant="contained" onClick={handleShowUserPosts}>
//           User Posts
//         </Button>
//       </Box>
//       <Box display="flex" flexWrap="wrap">
//         {showLikedPosts ? (
//           liked && liked.length > 0 ? (
//             liked?.map((item, index) => <FeedItem key={index} item={item} />)
//           ) : (
//             <Typography variant="body1" marginTop={10}>
//               No liked posts available.
//             </Typography>
//           )
//         ) : (
//           userPosts && userPosts.length > 0 ? (
//             userPosts?.map((item, index) => <FeedItem key={index} item={item} />)
//           ) : (
//             <Typography variant="body1" marginTop={10}>
//               No user posts available.
//             </Typography>
//           )
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default UserProfile;
