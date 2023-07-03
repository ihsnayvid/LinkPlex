import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Box, styled, Typography, Button, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";
import FeedItem from './FeedItem';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import Lottie from 'lottie-react';
import loading from '../assets/8471-hamster-wheel-loading.json';

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



const SortButton = styled(Button)`
  margin-top: 5vh;
  margin-left: 2rem;
  border: 4px solid rgb(39, 39, 39);
  box-shadow: 0.4rem 0.4rem rgb(26, 26, 26);

  &:hover {
    background-color: transparent; /* Add transparent background on hover */
    scale: 1.5;
    transition: 0.3s;
  }
`;

const DirectionButton = styled(Button)`
  margin-top: 5vh;
  margin-left: 10%;
  background: #b3ffae;
  color: black;
  font-size: 20px;
  border: 4px solid rgb(39, 39, 39);
  box-shadow: 0.4rem 0.4rem rgb(26, 26, 26);

  &:hover {
    background: #b3ffae;
    scale: 1.5;
    transition: 0.3s;
  }
`;

const HomeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    .hide-sidebar {
      display: none; /* Hide the sidebars */
    }
  }
`;
const TopWeb = styled(Box)`
  position:absolute;
  bottom:5vh;
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
  &:hover{
    scale:1.5;
    transition:0.3s;
  }
`;

const WebsiteLogo = styled('img')`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const SearchBox = styled(TextField)`
  margin-top:20vh;
  background-color: #F5F5F5;
  border-radius: 4px;

  & .MuiOutlinedInput-root {
    & fieldset {
      border: 4px solid rgb(39,39,39);
      box-shadow: 0.4rem 0.4rem rgb(26,26,26);
    }
    &.Mui-focused fieldset {
      border:4px solid blue; 
    }
  }
`


const SidebarBoxLeft = styled(Box)`
  border: 4px solid rgb(39,39,39);
  box-shadow: 0.4rem 0.4rem rgb(26,26,26);
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
  border: 4px solid rgb(39,39,39);
  box-shadow: -0.4rem -0.4rem rgb(26,26,26);
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
  margin-top:10vh;
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
  const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideSidebar, setHideSidebar] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setHideSidebar(true);
      } else {
        setHideSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
        return sortDirection === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      } else if (sortOption === 'links') {
        const linksA = a.links?.length ?? 0;
        const linksB = b.links?.length ?? 0;
        return sortDirection === 'asc' ? linksA - linksB : linksB - linksA;
      } else if (sortOption === 'time') {
        const timeA = a.time;
        const timeB = b.time;
        return sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
      }
      return 0;
    });
  };
  
  const getAllPosts = async () => {
    const postsCollectionRef = collection(db, "Post");
    try{
      const data = await getDocs(postsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllPosts(filteredData);
      setIsLoading(false);
      // console.log(filteredData);
    }
    catch(err){
      console.log(err.message);
      setIsLoading(false);
    }
     
  }
  useEffect(() =>{
    // console.log(user.displayName);
    // console.log(user.email);
    // console.log(user.photoURL);
    getAllPosts();
  }, []);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  
  const filteredData = filterData();
  const sortedData = sortData(filteredData);
  
  return (
    <HomeContainer className='hide-sidebar' >
      {!hideSidebar && (
        <>
    <SidebarBoxLeft>
      <Box marginBottom={2}>
        <SearchBox
          label="Search by Title/Tags"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
      </Box>
      <Box marginBottom={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="body1">Sort By:</Typography>
          <SortButton
            variant={sortOption === 'title' ? 'contained' : 'outlined'}
            onClick={() => setSortOption('title')}
            // style={{ marginRight: '8px' }}
          >
          Title
          </SortButton>
          <SortButton
            variant={sortOption === 'links' ? 'contained' : 'outlined'}
            onClick={() => setSortOption('links')}
          >
          Links
          </SortButton>
          <SortButton
          variant={sortOption === 'time' ? 'contained' : 'outlined'}
          onClick={() => setSortOption('time')}
        >
          Time
        </SortButton>
        <DirectionButton
          variant="outlined"
          onClick={handleSortDirectionChange}
          style={{ marginLeft: '' }}
        >
          {sortDirection === 'asc' ? '↑' : '↓'}
        </DirectionButton>
      </Box>

    </SidebarBoxLeft>
        </>
      )}
    <Box marginTop={"10vh"}>
    {isLoading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' ,height: "450vh" }}>
      {/* <ClimbingBoxLoader color="#F6FA70" size={50} /> */}
      <Lottie animationData={loading} />
      </Box>
    ) : (
      <>
      {allPosts && allPosts.length > 0 ? (
        sortedData?.map((item, index) => <FeedItem key={index} item={item} />)
      ) : (
        <Typography variant="body1" marginTop={10}>
          No Posts available.
        </Typography>
      )}  
      </>
    )}
    </Box>
    {!hideSidebar && (
        <>
      <SidebarBoxRight>
        <UserImageCircle src={user?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
          {/* <Link to={"/userProfile"}> */}
          <Link to={`/profile/${encodeURIComponent(user?.email)}/${encodeURIComponent(user?.displayName)}/${encodeURIComponent(user?.photoURL)}`}>                
             
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
        </>
      )}
    </HomeContainer>
  );
};

export default Home;