import { UserData } from "./usersListSlice";

export function fetchUsers(amount = 30): Promise<UserData[]> {
  return fetch(`https://api.github.com/users?per_page=${amount}`)
    .then(response => response.json())
}
