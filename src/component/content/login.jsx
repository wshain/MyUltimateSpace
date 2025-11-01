import React, { Component } from 'react';
import Base from './base';
import $ from 'jquery';
import { jwtDecode } from 'jwt-decode';
import { connect } from 'react-redux';
import ACTIONS from '../../redux/actions';

class Login extends Component {
    state = {
    };

    handleClick = e => {
        e.preventDefault();
        const {username, password,setErrorMessage,setUsername,setPassword,setAccess,getinfo} = this.props;
        if (username === "") {
            setErrorMessage("用户名不能为空");
        } else if (password === "") {
            setErrorMessage("密码不能为空");
        } else 
        {
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/api/token/",
                type: "post",
                data: {
                    username:username,
                    password: password,
                },
                dataType:"json",
                //不能用success=...,对象内部不能赋值
                //ES6方法简写：success(){...}也是对 对象方法定义，等价与success:function(){...},ES6方法简写允许省略： function
                success(resp){
                    const { access, refresh } = resp;
                    const access_obj = jwtDecode(access);
                    const intervalId = setInterval(() => {
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "POST",
                            data: {
                                refresh,
                            },
                            success(resp) {
                                setAccess(resp.access);
                                
                            },
                            error: ()=>{
                                clearInterval(intervalId);
                            }
                        })
                    }, 4.5 * 60 * 1000);
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "GET",
                        data: {
                            user_id: access_obj.user_id,
                        },
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            getinfo({
                                ...resp,
                                access:access,
                                refresh:refresh,
                                is_login:true,
                            });
                        },
                        error: ()=> {
                            setErrorMessage("获取用户信息失败");
                        }
                    });
                },
                error:()=> {
                    this.props.setErrorMessage("用户名或密码错误");
                }
            })
        }
    }

    render() { 
        const { username, password, error_message, setUsername, setPassword } = this.props;
        return (
            <Base>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-sm-3">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">用户名</label>
                                    <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">密码</label>
                                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" />
                                </div>
                                <div style={{height: "2rem", color: "red"}}>{error_message}</div>
                                <button onClick={this.handleClick} style={{width: "100%"}} type="submit" className="btn btn-primary">登录</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Base>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        username:state.reducerMyspace.username,
        password: state.reducerMyspace.password,
        error_message:state.reducerMyspace.error_message,
    }
};

const mapDispatchToProps = (dispatch)=>({
    setUsername:(username) => dispatch({
            type: ACTIONS.SET_USERNAME,
            username:username,
    }),
    setPassword:(password) => dispatch({
        type:ACTIONS.SET_PASSWORD,
        password: password,
    }),
    setErrorMessage: (error_message)=>dispatch({
        type:ACTIONS.SET_ERROR_MESSAGE,
        error_message:error_message,
    }),
    setAccess: (access)=>dispatch({
        type:ACTIONS.SET_ACCESS,
        access:access,
    }),
    islogin: () => dispatch({ 
        type: ACTIONS.ISLOGIN
    }),
    refresh: (access) =>dispatch({
            type: ACTIONS.REFRESH,
            access:access,
    }),
    getinfo: (resp) =>dispatch({
            type: ACTIONS.GETINFO,
            resp: resp,
    }),
});
export default connect(mapStateToProps,mapDispatchToProps)(Login);
