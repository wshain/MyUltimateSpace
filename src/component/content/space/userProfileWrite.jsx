import React, { Component } from 'react';
import Base from '../base';
class UserProfileWrite extends Component {
    state = {  } 
    render() { 
        return (
            <div className="card edit-field" style ={{marginTop:"10px"}}>
                <div className="card-body">
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="edit-post" style={{height: "120px"}}></textarea>
                        <label for="edit-post">发个帖子吧</label>
                        <button className="btn btn-info"style={{marginTop:"10px"}}>发布</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default UserProfileWrite;