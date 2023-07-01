import { Box, Typography, styled } from '@mui/material';


const UserBox = styled(Box)`
  height:45vh;
  display: flex;
  align-items: center;
  justify-content:space-around;
  background:#FFD0D0;
  margin-top:30px;
  border-bottom:4px solid rgb(39,39,39);
`;

const UserImageCircle = styled('img')`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 8px;
`;

const UserInfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const UserBoxY = (props) => {
  return (
    <UserBox>
      <UserImageCircle src={props?.photoURL} alt="User" />
      <UserInfoBox>
        <Typography variant="h4" >{props?.email}</Typography>
        <Typography variant="h6">{props?.displayName}</Typography>
      </UserInfoBox>
    </UserBox>
  )
}

export default UserBoxY