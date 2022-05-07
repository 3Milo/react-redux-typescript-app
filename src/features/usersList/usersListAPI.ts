import { UserData } from "./usersListSlice";

export const fetchUsers = (page: number): Promise<UserData[]> => {
  const userId = (page - 1) * 30
  return fetch(`https://api.github.com/users?per_page=30&since=${userId}`)
    .then(response => response.json())
}
