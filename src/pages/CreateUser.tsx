import React from "react"
import Typography from "@mui/material/Typography";
import {Form} from "../components/Form";
import {createUserAPI} from "../api";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
const CreateUser = () => {
  const navigate = useNavigate()
  const {mutate, isError, isLoading, isSuccess} = useMutation({
    mutationFn: createUserAPI,
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back${context}`)
    },
    onSuccess: (data, variables, context) => {
      navigate("/")
    },
  })

  if(isError) return <div>An error occurred</div>

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Create New User
      </Typography>
      {isLoading ? (
        'Adding USER...'
      ) : (
        <>

          {isSuccess ? <Typography>User added!</Typography> : null}

            <Form handleClickSubmit={mutate}/>
          </>
        )}
    </>
  )
}

export default CreateUser;
