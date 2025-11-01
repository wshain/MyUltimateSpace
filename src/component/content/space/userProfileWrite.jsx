import React, {useState} from 'react';
import Base from '../base';
import $ from 'jquery';
import { useSelector } from 'react-redux';

const UserProfileWrite =({onAddPost}) =>{
    const access = useSelector(state => state.reducerMyspace.access);
    const [content, setContent] = useState("");
    const publish_post = ()=>{
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "POST",
            data: {
                content: content,
            },
            headers: {
                'Authorization': "Bearer " + access,
            },
            success(resp) {
                if(resp.result === "success") {
                    onAddPost({
                        content: content,
                    });
                    setContent("");
                }
            }
        })
    }
    return (
        <Base>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" id="edit-post" value ={content} onChange={(e) => setContent(e.target.value)}style={{height: "120px"}}></textarea>
                <label>发个帖子吧</label>
                <button onClick={publish_post} className="btn btn-info"style={{marginTop:"10px"}}>发布</button>
            </div>
        </Base>
    );
    }
 
export default UserProfileWrite;