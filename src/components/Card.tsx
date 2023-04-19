import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {setUserStatus, UserModel} from "../model/user";
import React, {ReactNode} from "react";


interface ICardDetail {
  userData: UserModel
  children: ReactNode
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export function CardDetails({userData, children}: ICardDetail) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
          User Name: {userData.userName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          First Name: {userData.firstName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Last Name: {userData.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Email: {userData.email}
          <br />
          Description: {userData.department}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
          Status: {setUserStatus(userData.userStatus)}
        </Typography>
      </CardContent>
      {children}
    </Card>
  );
}
