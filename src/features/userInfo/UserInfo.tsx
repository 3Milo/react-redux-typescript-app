import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserInfoData, selectUserInfoStatus, UserInfoStatus, downloadInfo } from "./userInfoSlice";
import { LoadingMask } from "../../components/LoadingMask";
import styles from './UserInfo.module.css';

export const UserInfo = () => {
  const info = useAppSelector(selectUserInfoData);
  const status = useAppSelector(selectUserInfoStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBackButton = () => navigate('/');

  useEffect(() => {
    const login = window.location.pathname.slice(1);
    dispatch(downloadInfo(login));
  }, [dispatch]);

  return status !== UserInfoStatus.Idle ? (<LoadingMask />) : (
    <div className={styles.UserInfo}>
      {info && (
        <div className={styles.flexContainer}>
          <img src={info.avatar_url} className={styles.avatar} alt="avatar"/>
          <div className={styles.userInfoDetails}>
            <div><b>Name:</b> {info.name}</div>
            <div><b>Followers:</b> {info.followers}</div>
            <div><b>Following:</b> {info.following}</div>
            <div><b>Created at:</b> {info.created_at}</div>
            <div><b>Company:</b> {info.company}</div>
            <div><b>Email:</b> {info.email}</div>
            <div><b>Location:</b> {info.location}</div>
            <div><b>Blog:</b> {info.blog}</div>
            <div><b>Bio:</b> {info.bio}</div>
          </div>
        </div>
      )}
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
    </div>
  )
}
