import React, { Component, useState, useEffect } from 'react';
import Base from "./base";
import UserProfileInfo from "./space/userProfileInfo";
import UserProfileWrite from "./space/userProfileWrite";
import UserProfilePost from "./space/userProfilePost";
import $ from "jquery";
import store from '../../redux/store'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const UserProfile = ({id:currentUserId}) => {
    const { userId } = useParams();
    const parsedUserId = parseInt(userId);

    const [user, setUser] = useState({
        id: "",
        username: "",
        photo: null,
        followerCount: 0,
        is_followed: false,
        is_me: false,
        });
    useEffect(()=>{
        // 只在 userId 或 currentUserId 变化时重新请求
        if (isNaN(parsedUserId)) return;
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: parsedUserId,
            },
            headers: {
                'Authorization': "Bearer " + store.getState().reducerMyspace.access,
            },
            success:(resp)=> {
                setUser({
                    id: resp.id,
                    username: resp.username,
                    photo: resp.photo,
                    followerCount: resp.followerCount,
                    is_followed: resp.is_followed,
                    is_me: currentUserId === resp.id ? true : false,
                    });
                },
            error: (err) => {
                console.error("Failed to fetch user info:", err);
                // 可选：设置错误状态或提示
                }
            });
    },[parsedUserId, currentUserId]);// 依赖项
    
    const handleFollowChange = (isFollowed) => {
        setUser(prev => ({
        ...prev,
        is_followed: isFollowed,
        followerCount: isFollowed ? prev.followerCount + 1 : prev.followerCount - 1
        }));
    };
    const render_userProfileWrite = (is_me) =>{
        if(!is_me) return;
        else {
            return (
                <UserProfileWrite></UserProfileWrite>
            );
        }
    }
    return (
        <Base>
            <div className="row">
            <div className="col-3">
            <UserProfileInfo user={user} onFollowChange={handleFollowChange}></UserProfileInfo>

            {render_userProfileWrite(user.is_me)}
            </div>
            <div className="col-9">
            <UserProfilePost></UserProfilePost>
            </div>        
        </div>
        </Base>
    );
}
  
const mapStateToProps = (state, props) => {
    return {
        id:state.reducerMyspace.id,
    }
};
 export default connect(mapStateToProps)(UserProfile);