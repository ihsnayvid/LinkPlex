// import React from 'react'
// import { useState, useEffect } from 'react';

// import { Box, Card, CardActions, CardContent, Button, styled, Typography } from '@mui/material';

// // import { getPosts } from '../service/api';

// //styling not working yet

// const styledCard = styled(Card)`
//   margin: 10px,
//   padding: 10px,
//   display: flex,
//   align-items: center,
//   justify-content: center
// `;
// const Home = () => {
//   const [posts, setPosts] = useState([]);
    
//     // useEffect(() => {
//         // getAllPosts();
//     // }, []);


//     // const getAllPosts = async () => {
//     //     let response = await getPosts();
//     //     setPosts(response.data);
//     // }


//   return (
//     <>

//       {posts.map((post) => (

//         <styledCard>          
//           <CardContent sx={{width: 300, border: "1px solid lightgray"}}>
//             <Typography variant="h5" component="div">
//               # {post.id} Title: {post.title}
//             </Typography>
//             <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
//               Name: {post.name}
//             </Typography>
//             <Typography sx={{ mb: 1.5 }} color="text.secondary">
//               Link: {post.link}
//             </Typography>
//             <Typography variant="body2">
//               Description: 
//               <br />
//               {post.description}
//             </Typography>
//             <Typography>
//               <Button size="small">Tags: {post.tags} </Button>
//             </Typography>
//           </CardContent>
//         </styledCard>
//       ))}
//     </>
//   )
// }

// export default Home
import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home