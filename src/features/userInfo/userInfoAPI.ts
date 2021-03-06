import { UserInfo } from "./userInfoSlice";

export const fetchUserInfo = (login: string): Promise<UserInfo> => {
  return fetch(`https://api.github.com/users/${login}`)
    .then(response => response.json())
}
