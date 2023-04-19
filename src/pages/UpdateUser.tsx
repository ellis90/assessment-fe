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
import {Form} from "../components/Form";
import {useMutation} from "@tanstack/react-query";
import {UpdateUserAPI} from "../api";

const UpdateUser = () => {
  const [state, setState] = useState<UserModel>()
  const {mutate} = useMutation({
    mutationFn: UpdateUserAPI,
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context}`)
    },
    onSuccess: (data, variables, context) => {
      navigate("/")
    },
  })
  const navigate = useNavigate()
  const handleNavigation = () => {
    setState(undefined)
    navigate("/")
  }
  useEffect(() => {
    localforage.getItem<UserModel>("userDetails")
      .then((data) => {
        if(data) setState(data)
      })

    return () => {setState(undefined); localStorage.removeItem("userDetails")}
  }, [])
    return <>
    <Typography variant="h2" gutterBottom>
      Update User
    </Typography>
      {state && <Form handleClickSubmit={mutate} updateValue={state}/>}
  </>
}

export default UpdateUser
