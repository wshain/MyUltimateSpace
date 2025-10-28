import React, { Component } from 'react';
import Base from '../base';
import $ from 'jquery'
import store from '../../../redux/store';
import "../../../index.css";
class UserProfileInfo extends Component {
    state = {
    }
    follow =() => {
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
            type: "POST",
            data: {
                target_id: this.props.user.id,
            },
            headers: {
                'Authorization': "Bearer " + store.getState().reducerMyspace.access,
            },
            success:(resp)=>{
                if(resp.result === "success"){
                    this.props.onFollowChange(true);
                }
            }
        })
    }
    unfollow =() => {
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
            type: "POST",
            data: {
                target_id: this.props.user.id,
            },
            headers: {
                'Authorization': "Bearer " + store.getState().reducerMyspace.access,
            },
            success:(resp)=>{
                if(resp.result === "success"){
                    this.props.onFollowChange(false);
                }
            }
        })
    }
    render_follow_button = () =>{
        if(!this.props.user.is_followed)
        {
            return ( <button onClick = {this.follow}className="btn btn-secondary btn-sm" style={{padding:"2px 4px", fontSize:"12px"}}>+关注</button>);
        } else {
            return (<button onClick = {this.unfollow}className="btn btn-secondary btn-sm" style={{padding:"2px 4px", fontSize:"12px"}}>取消关注</button>);
       }
        

    }
    render() { 
        return (
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 img-field">
                                <img className="img-fluid"  src={this.props.user.photo} alt={this.props.user.username} style={{borderRadius: "50%"}}/>
                            </div>
                            <div className="col-9">
                                <div className="username" style={{fontWeight:"bold"}}>{this.props.user.username}</div>
                                <div className="fans" style={{fontSize:"12px", color:"gray"}}>粉丝数：{this.props.user.followerCount}</div>
                                {this.render_follow_button()}

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default UserProfileInfo;