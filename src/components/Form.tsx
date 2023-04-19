import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {setUserStatus, UserModel, UserStatus} from "../model/user";
import {useNavigate} from "react-router-dom";


const defaultValue: UserModel = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  userStatus: 0,
}
const statusOptions = [
  {key: UserStatus.Inactive, value: 0},
  {key: UserStatus.Active, value: 1},
  {key: UserStatus.Terminated, value: 2},
]
interface IForm {
  handleClickSubmit(data: UserModel): void;
  updateValue?: UserModel
}
export const Form = ({handleClickSubmit, updateValue}: IForm) => {
  const {handleSubmit, register, reset, formState: { errors }} = useForm<UserModel>({
    defaultValues: defaultValue,
    values: updateValue
  })
  const onSubmit: SubmitHandler<UserModel> = async (data) => {
    handleClickSubmit(data)
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid>
          <Grid item xs={6} md={6}>
            <TextField
              error={!!errors.userName}
              label="User name"
              id="outlined-size-normal"
              {...register('userName', {required: true})}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              error={!!errors.firstName}
              label="First Name"
              id="outlined-size-normal"
              {...register('firstName', {required: true})}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              error={!!errors.lastName}
              label="Last Name"
              id="outlined-size-normal"
              {...register('lastName', {required: true})}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              error={!!errors.email}
              label="Email"
              id="outlined-size-normal"
              {...register('email', {required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/})}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="outlined-select-status"
              select
              label="Select Status"
              defaultValue={setUserStatus(updateValue?.userStatus ?? 0) ?? UserStatus.Active}
              helperText="Please select user status"
              {...register('userStatus', {required: true})}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6} md={6}>
            <TextField
              label="description"
              id="outlined-size-normal"
              error={!!errors.department}
              {...register('department', {required: true})}
            />
          </Grid>
        </Grid>
        <Button variant="contained" type={"submit"}>Submit</Button>
      </Box>
    </>
  )
}
