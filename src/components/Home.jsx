import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography, Button, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";
import FeedItem from './FeedItem';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const topWebsites = [
  {
    name: 'Google',
    link: 'https://www.google.com',
    imageUrl: 'https://www.google.com/favicon.ico'
  },
  {
    name: 'YouTube',
    link: 'https://www.youtube.com',
    imageUrl: 'https://www.youtube.com/favicon.ico'
  },
  {
    name: 'Facebook',
    link: 'https://www.facebook.com',
    imageUrl: 'https://www.facebook.com/favicon.ico'
  },
  {
    name: 'Amazon',
    link: 'https://www.amazon.com',
    imageUrl: 'https://www.amazon.com/favicon.ico'
  },
  {
    name: 'Twitter',
    link: 'https://www.twitter.com',
    imageUrl: 'https://www.twitter.com/favicon.ico'
  }
];


const HomeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TopWeb = styled(Box)`
  margin-top:10px;
  width:80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:white;
  border: 4px solid rgb(39,39,39);
  box-shadow: 0.7rem 0.7rem rgb(26,26,26);
`;
const WebsiteBox = styled(Box)`
  margin-top:5px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 6px;
`;

const WebsiteLogo = styled('img')`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const SearchBox = styled(TextField)`
  margin-top:50px;
  background-color: #F5F5F5;
  border-radius: 4px;

  & .MuiOutlinedInput-root {
    & fieldset {
      border:4px solid rgb(39,39,39); 
    }
    &.Mui-focused fieldset {
      border:4px solid blue; 
    }
  }
`


const SidebarBoxLeft = styled(Box)`
  position: fixed;
  width: 20%;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color:#FFD0D0;
  border-right:4px solid rgb(39,39,39); 
`;
const SidebarBoxRight = styled(Box)`
  position: fixed;
  width: 20%;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFD0D0;
  border-left: 4px solid rgb(39,39,39);
`;

const UserImageCircle = styled('img')`
  margin-top:50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid rgb(39,39,39);
`;

const UserNameButton = styled(Button)`
  margin-top: 16px;
  color:black;
  background: #F266AB;
  border: 4px solid rgb(39,39,39);
`;

const Home = () => {
  // useEffect
  const [user,isLoading,error] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [allPosts, setAllPosts] = useState([]);

  const filterData = () => {
    if (searchQuery === '') {
      return allPosts;
    } else {
      return allPosts?.filter(
        (item) =>
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
  };
  const sortData = (filteredData) => {
    return (filteredData ?? []).sort((a, b) => {
      if (sortOption === 'title') {
        const titleA = a.title ?? '';
        const titleB = b.title ?? '';
        return titleA.localeCompare(titleB);
      } else if (sortOption === 'links') {
        const linksA = a.links?.length ?? 0;
        const linksB = b.links?.length ?? 0;
        return linksB - linksA;
      }
      return 0;
    });
  };

  const getAllPosts = async () => {
    const postsCollectionRef = collection(db, "Post");
    try{
      const data = await getDocs(postsCollectionRef);
      console.log("counting")
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllPosts(filteredData);
      // console.log(filteredData);
    }
    catch(err){
      console.log(err.message);
    }
     
  }
  useEffect(() =>{
    // console.log("effect from app");
    getAllPosts();
  }, []);
  
  
  
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
      setSortOption(event.target.value);
  };
  
  const filteredData = filterData();
  //  console.log(filteredData)
  const sortedData = sortData(filteredData);
  
  return (
    <HomeContainer >
    <SidebarBoxLeft>
      <Box marginBottom={2}>
        <SearchBox
          label="Search by Title/Tags"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
      </Box>
      <Box marginBottom={2}>
        <Typography variant="body1">Sort By:</Typography>
          <Button
            variant={sortOption === 'title' ? 'contained' : 'outlined'}
            onClick={() => setSortOption('title')}
            style={{ marginRight: '8px' }}
          >
          Title
          </Button>
          <Button
            variant={sortOption === 'links' ? 'contained' : 'outlined'}
            onClick={() => setSortOption('links')}
          >
          Links
          </Button>
      </Box>

    </SidebarBoxLeft>
      {allPosts && allPosts.length > 0 ? (
        sortedData?.map((item, index) => <FeedItem key={index} item={item} />)
      ) : (
        <Typography variant="body1" marginTop={10}>
          No Posts available.
        </Typography>
      )}
      <SidebarBoxRight>
        <UserImageCircle src={user?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
          <Link to={"/userProfile"}>
        <UserNameButton>
          {user?.displayName || "Anonymous"}
        </UserNameButton>
          </Link>
        <TopWeb>
        <Typography style={{ textDecoration: 'underline' }}>Top 5 Links</Typography>
          {topWebsites.map((website, index) => (
            <WebsiteBox key={index}>
              <WebsiteLogo src={website.imageUrl} alt={website.name} />
              <Typography variant="body1" component="a" href={website.link} target="_blank" rel="noopener noreferrer">
                {website.name}
              </Typography>
            </WebsiteBox>
          ))}
        </TopWeb>
      </SidebarBoxRight>
    </HomeContainer>
  );
};

export default Home;
