import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectInfoData, selectInfoStatus, InfoStatus, downloadInfo } from "./infoSlice";
import { LoadingMask } from "../../components/LoadingMask";
import styles from './Info.module.css';

export interface UserInfo {
  avatar_url: string,
  name: string,
  followers: number,
  following: number,
  created_at: string,
  company: string,
  email: string,
  location: string,
  blog: string,
  bio: string
}

export function Info() {
  const info = useAppSelector(selectInfoData);
  const status = useAppSelector(selectInfoStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleBackButton = () => navigate('/');

  useEffect(() => {
    const login = window.location.pathname.slice(1)
    dispatch(downloadInfo(login));
  }, [])

  return status !== InfoStatus.Idle ? (<LoadingMask />) : (
    <div className={styles.Info}>
      {info && (
        <div className={styles.flexContainer}>
          <img src={info['avatar_url']} className={styles.avatar} />
          <div className={styles.infoData}>
            <div><b>Name:</b> {info['name']}</div>
            <div><b>Followers:</b> {info['followers']}</div>
            <div><b>Following:</b> {info['following']}</div>
            <div><b>Created at:</b> {info['created_at']}</div>
            <div><b>Company:</b> {info['company']}</div>
            <div><b>Email:</b> {info['email']}</div>
            <div><b>Location:</b> {info['location']}</div>
            <div><b>Blog:</b> {info['blog']}</div>
            <div><b>Bio:</b> {info['bio']}</div>
          </div>
        </div>
      )}
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
    </div>
  )
}
