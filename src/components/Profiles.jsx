import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography, styled, TextField } from '@mui/material';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
// import { filter } from 'lodash';


const ProfileCard = styled(Card)`
  background:#FCFFE7;
  ${'' /* border:4px solid rgb(39,39,39); */}
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
  ${'' /* border:4px solid rgb(39,39,39); */}
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
  z-index: 999;
  background-color: white;
`;
// const Profiles = ({ musicArtists }) => {
  const Profiles = () => {
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
        console.log(filteredData);
      }
      catch(err){
        console.log(err.message);
      }
       
    }
    getAllUsers();
  }, []);
  return (
    <Box>
      <SearchBox
        label="Search by User Name"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
      />
      <Box display="flex" flexWrap="wrap" justifyContent="center" marginTop={20}>
        {filteredArtists.map((artist, index) => (
          <ProfileCard key={index}>
            <ArtistImage image={artist.Profile} alt={artist.name} />
            <CardContent >
              <NameButton  variant="contained" color="primary">
                {artist.Name}
              </NameButton>
            </CardContent>
          </ProfileCard>
        ))}
      </Box>
    </Box>
  );
};

export default Profiles;
