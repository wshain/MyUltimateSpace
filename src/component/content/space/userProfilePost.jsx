import React from 'react';
import Base from '../base';
import $ from 'jquery';
import { useSelector } from 'react-redux';

const UserProfilePost = ({posts,onDeletePost})=>{
    const access = useSelector(state => state.reducerMyspace.access);
    const deletePost=(post_id)=>{
        $.ajax({
            url:"https://app165.acapp.acwing.com.cn/myspace/post/",
            type:"DELETE",
            data:{
                post_id,
            },
            headers: {
                'Authorization': "Bearer " + access,
            },
            success(resp){
                if(resp.result === "success") {
                    onDeletePost(post_id);
                }
            }
        })
    }
    return (
        <Base>
            {
                posts.posts.map(post=>
                    <div className="card single-post" style={{marginBottom:"50px"}}>
                        <div className="card-body">
                            {post.content}
                            <button className="btn btn-danger btn-sm"onClick={()=>deletePost(post.id)} style={{float:"right"}}>删除</button>
                        </div>
                    </div>
                )
            }
        </Base>
    );
}

export default UserProfilePost;