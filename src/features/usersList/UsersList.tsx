import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { downloadUsers, selectUsersListUsers, selectUsersListStatus, UsersListStatus, UserData } from './usersListSlice';
import { LoadingMask } from "../../components/LoadingMask";
import styles from './UsersList.module.css';

export function UsersList() {
  const users = useAppSelector(selectUsersListUsers);
  const status = useAppSelector(selectUsersListStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRowClick = (login: string): void => {
    navigate(`/${login}`);
  }

  useEffect(() => {
    dispatch(downloadUsers(100));
  }, [])

  return status !== UsersListStatus.Idle ? (<LoadingMask />) : (
    <div className={styles.UsersList}>
      {users.map((user: UserData) => (
        <div
          key={`user-${user['id']}`}
          className={styles.row}
          onClick={() => handleRowClick(user['login'])}
        >
          <img src={user['avatar_url']} className={styles.avatar} />
          <div>{user['login']}</div>
          <div>{user['html_url']}</div>
        </div>
      ))}
    </div>
  )
}
