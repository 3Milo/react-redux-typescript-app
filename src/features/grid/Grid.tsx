import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { downloadUsers, selectGridUsers, selectGridStatus, GridStatus } from './gridSlice';
import { LoadingMask } from "../../components/LoadingMask";
import styles from './Grid.module.css';

export function Grid() {
  const users = useAppSelector(selectGridUsers);
  const status = useAppSelector(selectGridStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRowClick = (login: string): void => {
    navigate(`/${login}`);
  }

  useEffect(() => {
    dispatch(downloadUsers(100));
  }, [])

  return status !== GridStatus.Idle ? (<LoadingMask />) : (
    <div className={styles.grid}>
      {users.map(user => (
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
