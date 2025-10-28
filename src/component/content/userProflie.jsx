import React, { Component, useState, useEffect } from 'react';
import Base from "./base";
import UserProfileInfo from "./space/userProfileInfo";
import UserProfileWrite from "./space/userProfileWrite";
import UserProfilePost from "./space/userProfilePost";
import $ from "jquery";
import store from '../../redux/store'
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const parsedUserId = parseInt(userId);

    const [user, setUser] = useState({
        id: null,
        username: '',
        photo: null,
        followerCount: 0,
        is_followed: false,
        });
    $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
        type: "GET",
        data: {
            user_id: parsedUserId,
        },
        headers: {
            'Authorization': "Bearer " + store.getState().reducerMyspace.access,
        },
        success(resp) {
            setUser({
                id: resp.id,
                username: resp.username,
                photo: resp.photo,
                followerCount: resp.followerCount,
                is_followed: resp.is_followed,
                });
            }
        });
        const handleFollowChange = (isFollowed) => {
            setUser(prev => ({
              ...prev,
              is_followed: isFollowed,
              followerCount: isFollowed ? prev.followerCount + 1 : prev.followerCount - 1
            }));
          };
    return (
        <Base>
            <div className="row">
            <div className="col-3">
            <UserProfileInfo user={user} onFollowChange={handleFollowChange}></UserProfileInfo>
                
            <UserProfileWrite></UserProfileWrite>
            </div>
            <div className="col-9">
            <UserProfilePost></UserProfilePost>
            </div>        
        </div>
        </Base>
    );
}
  
 export default UserProfile;