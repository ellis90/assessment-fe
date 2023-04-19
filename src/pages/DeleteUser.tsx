import React, {useEffect, useState} from "react"
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {CardDetails} from "../components/Card";
import {UserModel} from "../model/user";
import localforage from "localforage";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {deleteUserAPI} from "../api";

const DeleteUser = () => {
  const [state, setState] = useState<UserModel |null>(null)
  const navigate = useNavigate()
  const {mutate} = useMutation({
    mutationFn: deleteUserAPI,
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context}`)
    },
    onSuccess: (data, variables, context) => {
      navigate("/")
    },
  })
  const handleNavigation = () => {
    setState(null)
    navigate("/")
  }

  useEffect(() => {
    localforage.getItem<UserModel>("userDetails")
      .then((data) => {
        if(data) setState(data)
        console.log(data)
      })

    return () => {setState(null); localStorage.removeItem("userDetails")}
  }, [])

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Delete User
      </Typography>

      {state ? (
        <CardDetails userData={state}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <CardActions>
              <Button size="small" onClick={handleNavigation}>Cancel</Button>
              {state && state?.id && <Button size="small" onClick={() => {mutate(state.id as string)}}>Delete</Button>}
            </CardActions>
          </Stack>
        </CardDetails>
      ): (<Typography variant="h3" gutterBottom>
        you have to select a User to delete in home page
      </Typography>)}
    </>
  )
}

export default DeleteUser
