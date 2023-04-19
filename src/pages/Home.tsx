import React from "react"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {CardDetails} from "../components/Card";
import {IUserResp, UserModel} from "../model/user";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import * as localforage from "localforage";
import {useQuery} from "@tanstack/react-query";
import {getUserAPI} from "../api";

const Home = () => {
  const navigate = useNavigate()

  const { isLoading, error, data, isFetching } = useQuery<IUserResp>({
    queryKey: ["userData"],
    queryFn: getUserAPI,
  });

  const handleNavigation = (link: string, data: UserModel) => {
    localforage.setItem("userDetails", data).then(() => {
      navigate(link)
    }, console.log)
  }

  if (isLoading || isFetching) return <h1>Loading...</h1>
  if (error) return <h1>error has occurred</h1>

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Display Users List
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data?.data.map(({User: userData}, idx) => (
            <Grid item xs={6} key={idx}>
              <CardDetails userData={userData}>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                  <CardActions>
                    <Button size="medium"  color="error" onClick={() => {handleNavigation("/delete", userData)}}>Delete user</Button>
                    <Button size="medium" color="info" onClick={() => {handleNavigation("/update", userData)}}>Update User</Button>
                  </CardActions>
                </Stack>
              </CardDetails>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Home

