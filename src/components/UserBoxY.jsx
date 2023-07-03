import { Box, Typography, styled } from '@mui/material';

const UserBox = styled(Box)`
  height: 45vh;
  display: flex;
  flex-direction:row;
  ${'' /* flex-direction:column; */}
  flexWrap: wrap;
  align-items: center;
  justify-content: center;
  background: #FFD0D0;
  margin-top: 30px;
  border-bottom: 4px solid rgb(39, 39, 39);

  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding: 16px;
  }
`;

const UserImageCircle = styled('img')`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 8px;

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const UserInfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    align-items: center;
    text-align: center;
  }
`;

const UserBoxY = (props) => {
  return (
    <UserBox>
      <UserImageCircle src={props?.photoURL} alt="User" />
      <UserInfoBox>
        <Typography variant="h4">{props?.email}</Typography>
        <Typography variant="h6">{props?.displayName}</Typography>
      </UserInfoBox>
    </UserBox>
  );
};

export default UserBoxY;
