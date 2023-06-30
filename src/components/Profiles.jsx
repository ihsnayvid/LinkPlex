import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography, styled, TextField } from '@mui/material';

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const SearchBox = styled(TextField)`
    width: 50%;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background-color: white;
`;

const Profiles = ({ musicArtists }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArtists = musicArtists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <SearchBox
        label="Search by User Name"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
      />
      <Box display="flex" flexWrap="wrap" justifyContent="center" marginTop={8}>
        {filteredArtists.map((artist, index) => (
          <ProfileCard key={index}>
            <ArtistImage image={artist.imageUrl} alt={artist.name} />
            <CardContent>
              <Button variant="contained" color="primary">
                {artist.name}
              </Button>
            </CardContent>
          </ProfileCard>
        ))}
      </Box>
    </Box>
  );
};

export default Profiles;
