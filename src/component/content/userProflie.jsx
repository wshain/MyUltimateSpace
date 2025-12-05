import React, {useState, useEffect } from 'react';
import Base from "./base";
import UserProfileInfo from "./space/userProfileInfo";
import UserProfileWrite from "./space/userProfileWrite";
import UserProfilePost from "./space/userProfilePost";
import $ from "jquery";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const UserProfile = ({id, access}) => {
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
    const [posts, setPosts] = useState({
        posts:[],
        count:0,
        });
    useEffect(()=>{
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: parsedUserId,
            },
            headers: {
                'Authorization': "Bearer " + access,
            },
            success:(resp)=> {
                setUser({
                    id: resp.id,
                    username: resp.username,
                    photo: resp.photo,
                    followerCount: resp.followerCount,
                    is_followed: resp.is_followed,
                    is_me: id === resp.id ? true : false,
                    });
                },
            error: (err) => {
                console.error("Failed to fetch user info:", err);
                // 可选：设置错误状态或提示
                }
            });
        $.ajax({
            url:"https://app165.acapp.acwing.com.cn/myspace/post/",
            type:"GET",
            data: {
                user_id: parsedUserId,
            },
            headers: {
                'Authorization': "Bearer " + access,
            },
            success:(resp)=> {
                setPosts({
                    posts:resp,
                    count:resp.length,
                    });
                },
        });
    },[parsedUserId, id]);// 依赖项
    
    const handleFollowChange = (isFollowed) => {
        setUser(prev => ({
        ...prev,
        is_followed: isFollowed,
        followerCount: isFollowed ? prev.followerCount + 1 : prev.followerCount - 1
        }));
    };
    const handleAddPost = (newPostContent) => {
        setPosts(prev => {
            const newPost = {
                id: prev.count + 1, 
                userId: user.id,
                content: newPostContent.content, 
            };
            return {
                posts: [newPost, ...prev.posts],
                count: prev.count + 1,
            };
        });
    };
    const handleDeletePost=(post_id)=>{
        setPosts(prev => {
            const newPosts = prev.posts.filter(post => post.id !== post_id);
            return {
              posts: newPosts,
              count: newPosts.length,
            };
          });
    }
    const render_userProfileWrite = (is_me) =>{
        if(!is_me) return;
        else {
            return (
                <UserProfileWrite onAddPost={handleAddPost}></UserProfileWrite>
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
            <UserProfilePost posts={posts} onDeletePost={handleDeletePost}></UserProfilePost>
            </div>
        </div>
        </Base>
    );
}
  
const mapStateToProps = (state, props) => {
    return {
        id:state.reducerMyspace.id,
        access:state.reducerMyspace.access,
    }
};
 export default connect(mapStateToProps)(UserProfile);