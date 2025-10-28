import React, { useState, useEffect } from 'react';
import Base from './base';
import $ from 'jquery';
import  "../../index.css"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserList  =() => {
    const [users, setUsers] = useState([]); 
    const isLogin = useSelector(state => state.reducerMyspace.is_login);
    const navigate = useNavigate();

    useEffect(() => {
    $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
        type: "GET",
        success: (resp) => {
        setUsers(resp); // ✅ 更新状态
        },
        error: (err) => {
        console.error("未获取用户列表", err);
        },
    });
    }, []);
    

    const open_user_profile = (userId) => {
        if (isLogin) {
        navigate(`/calculator/userProfile/${userId}`);
        } else {
        navigate('/calculator/login');
        }
    }
    return (
        <Base>
            {users.length > 0 ? (
                users.map(user => (
                    <div className="card user-card" key = {user.id} style= {{marginBottom:"2px",cursor:"pointer"}}
                        onClick={() => open_user_profile(user.id)}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-1 img-field">
                                    <img className="img-fluid" src={user.photo} style = {{borderRadius: "50%"}}/>
                                </div>
                                <div className="col-11">
                                    <div className="username" style={{fontWeight:"bold", height:"50%"}}>{user.username}</div>
                                    <div className="follower-count" style={{fontSize:"12px", color:"gray",height:"50%"}}>粉丝: {user.followerCount || 0} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center mt-4">加载中...</div>
            )}
        </Base>
    );

}
 
export default UserList;