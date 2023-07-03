import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography, styled, TextField } from '@mui/material';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import ghostLoader from '../assets/98432-loading.json';
import Lottie from 'lottie-react';

const ProfileCard = styled(Card)`
  background:#FCFFE7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0.7rem 0.7rem rgb(26,26,26);
  width: 200px;
  height: 200px;
  margin: 16px;
`;

const ArtistImage = styled(CardMedia)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 16px;
`;
const NameButton = styled(Button)`
  background:#3CCF4E;
  width:100%;
`
const SearchBox = styled(TextField)`
  width: 50%;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background-color: white;
`;


  const Profiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArtists = allUsers.filter((artist) =>
    artist.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() =>{
    const getAllUsers = async () => {
      
      try{
        const usersCollectionRef = collection(db, "user");
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllUsers(filteredData);
        setIsLoading(false);
        // console.log(filteredData);
      }
      catch(err){
        console.log(err.message);
      }
       
    }
    getAllUsers();
  }, []);
  return (
    <Box marginTop={"20vh"}>
      <SearchBox
        label="Search by User Name"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
      />
    {isLoading ? (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {/* <BounceLoader color="#F6FA70" size={300} /> */}
        <Lottie animationData={ghostLoader}/>
      </Box>
    ) : (
      <>
      <Box display="flex" flexWrap="wrap" justifyContent="center" marginTop={20}>
        {filteredArtists.map((artist, index) => (

          <ProfileCard key={index}>
            <ArtistImage image={artist.Profile} alt={artist.Name} />
            <CardContent >
            <Link to={`/profile/${encodeURIComponent(artist.Email)}/${encodeURIComponent(artist.Name)}/${encodeURIComponent(artist.Profile)}`}>                
              <NameButton  variant="contained" color="primary">
                {artist.Name}
              </NameButton>
              </Link>
            </CardContent>
          </ProfileCard>
        ))}
      </Box>
      </>
    )}
    </Box>
  );
};

export default Profiles;
