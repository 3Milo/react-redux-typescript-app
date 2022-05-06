import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  pageIncrement,
  pageDecrement,
  downloadUsers,
  selectUsersListUsers,
  selectUsersListStatus,
  selectUsersListPage,
  UsersListStatus,
  UserData
} from './usersListSlice';
import { LoadingMask } from "../../components/LoadingMask";
import styles from './UsersList.module.css';

export function UsersList() {
  const users = useAppSelector(selectUsersListUsers);
  const status = useAppSelector(selectUsersListStatus);
  const page = useAppSelector(selectUsersListPage);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRowClick = (login: string): void => {
    navigate(`/${login}`);
  }

  useEffect(() => {
    dispatch(downloadUsers(page));
  }, [page])

  return status !== UsersListStatus.Idle ? (<LoadingMask />) : (
    <div className={styles.UsersList}>
      <div className={styles.UsersListHeader}>
        <h1>GitHub Users</h1>
        <div className={styles.UsesListHeaderPageCounter}>
          {/* TODO: define minPage */}
          <button
            onClick={() => dispatch(pageDecrement())}
            disabled={page < 2}
          >
            {'<'}
          </button>
          <span>{page}</span>
          {/* TODO: define maxPage */}
          <button
            onClick={() => dispatch(pageIncrement())}
            disabled={page > 6}
          >
            {'>'}
          </button>
        </div>
      </div>
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
