import React, { useState } from 'react';
import { Box, styled, Typography, Button, TextField } from '@mui/material';
import { Favorite, Chat } from '@mui/icons-material';

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
  ${'' /* height:50%; */}
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

const StyledBox = styled(Box)`
  display: flex;
  background-color:#F5E9CF;
  flex-direction: column;
  overflow:hidden;
  border: 1px solid lightgray;
  border-radius: 8px;
  width: 450px;
  margin-bottom: 16px;
  margin-top: 60px;
  box-shadow: 0.7rem 0.7rem rgb(26,26,26);
    border:4px solid rgb(39,39,39); 
  margin-left: auto;
  margin-right: auto;
`;

const UserImage = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const LikeIcon = styled(Favorite)`
  color: red;
`;

const CommentIcon = styled(Chat)`
  color: black;
`;

const ToolBox = styled(Box)`
  display: flex;
  width: 100%;
`;
const HeaderBox = styled(Box)`
  padding:10px;
  margin:0;
  background:#FF6F61;
`

const FeedItem = ({ item }) => {
  return (
    <StyledBox>
      <HeaderBox display="flex" alignItems="center" marginBottom={1}>
        <UserImage src={item.userImage} alt="User" />
        <Typography variant="body1">{item.username}</Typography>
        <Typography variant="body2" marginLeft={1} color="textSecondary">
          {item.Time}
        </Typography>
      </HeaderBox>
      <Typography marginX={2} variant="h6" gutterBottom>
        {item.Title}
      </Typography>
      {/* <Box marginBottom={1}> */}
        {/* Rest of the code */}
        <Box marginBottom={1} marginX={2}>
         {item.Links.map((link, index) => (
           <Button
             key={index}
             variant="outlined"
             color="primary"
             href={link.link}
             target="_blank"
             rel="noopener noreferrer"
             style={{ marginRight: '8px', marginBottom: '8px' }}
           >
             {link.name}
           </Button>
         ))}
       </Box>
       <Box marginBottom={1} marginX={2}>
         {item.Tags.map((tag, index) => (
           <Typography
             key={index}
             variant="body2"
             component="span"
             style={{ marginRight: '8px' }}
           >
             #{tag}
           </Typography>
         ))}
       </Box>
      <Typography variant="body1" marginX={2} paragraph>
        {item.Discription}
      </Typography>
      <ToolBox paddingY={2} paddingX={1}  borderTop={1}>
        <LikeIcon  sx={{ marginRight: '8px' }} />
        <CommentIcon />
      </ToolBox>
    </StyledBox>
  );
};

const Home = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const filterData = () => {
    if (searchQuery === '') {
      return data;
    } else {
      return data.filter(
        (item) =>
          item.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.Tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  };
  
  const sortData = (filteredData) => {
    return (filteredData ?? []).sort((a, b) => {
      if (sortOption === 'title') {
        return a.Title.localeCompare(b.Title);
      } else if (sortOption === 'time') {
        return a.Time.localeCompare(b.Time);
      }
      return 0;
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleSortChange = (event) => {
  //   setSortOption(event.target.value);
  // };
  
  const filteredData = filterData();
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
          variant={sortOption === 'time' ? 'contained' : 'outlined'}
          onClick={() => setSortOption('time')}
        >
          Time
        </Button>
      </Box>
    </SidebarBoxLeft>
      {/* {sortedData.map((item, index) => (
        <FeedItem key={index} item={item} />
      ))} */}
      {data && data.length > 0 ? (
        sortedData.map((item, index) => (
          <FeedItem key={index} item={item} />
        ))
      ) : (
        <Typography variant="body1" marginTop={10}>No data available.</Typography>
      )}
      <SidebarBoxRight>
        <UserImageCircle src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"/>
        <UserNameButton>Rahul Poddar</UserNameButton>
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
