export interface UserModel {
  id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  userStatus: number;
}

export enum UserStatus {
  Inactive = "Inactive",
  Active = "Active",
  Terminated = "Terminated"
}

export const setUserStatus = (status: number) => {
  switch (status) {
    case 0:
      return UserStatus.Inactive
    case 1:
      return UserStatus.Active
    case 2:
      return UserStatus.Terminated
    default:
      return null
  }
}

interface User {
  User: UserModel
}

export interface IUserResp {
  data: User[]
  message: string
  status: string
}
