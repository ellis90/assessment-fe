import axios from "axios";
import {UserModel} from "../model/user";

const BaseURL = "http://localhost:9191"
export const getUserAPI = () => (
  axios
    .get(`${BaseURL}/user`)
    .then((res) => res.data)
)


export const createUserAPI= (data: UserModel) => (
  axios
    .post(`${BaseURL}/user`, data)
    .then((res) => res.data)
)
export const UpdateUserAPI= (data: UserModel) => (
  axios
    .put(`${BaseURL}/user`, data)
    .then((res) => res.data)
)
export const deleteUserAPI= (id: string) => (
  axios
    .delete(`${BaseURL}/user/${id}`)
    .then((res) => res.data)
)
