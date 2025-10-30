import React, { Component } from 'react';
import NavBar from './navBar';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './content/home';
import Calculator from './content/calculator';
import UserList from './content/userList';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notFound';
import { connect } from 'react-redux';
import UserProfile from './content/userProflie';


class App extends Component {
    state = {
    };

    render() { 
        return (
            <React.Fragment>
                <NavBar is_login={this.props.is_login} username={this.props.username} id ={this.props.id}/>
                <div className='container'>
                    <Routes>
                        <Route path='/calculator' element={<Home />} />
                        <Route path='/calculator/home' element={<Home />} />
                        <Route path='/calculator/calculator' element={this.props.is_login ? <Calculator /> : <Navigate replace to="/calculator/login" />} />
                        <Route path='/calculator/userList' element={this.props.is_login ? <UserList /> : <Navigate replace to="/calculator/login" />} />
                        <Route path='/calculator/login' element={this.props.is_login ? <Navigate replace to="/calculator" /> : <Login />} />
                        <Route path='/calculator/userProfile' element={<UserProfile />} />
                        <Route path='/calculator/register' element={this.props.is_login ? <Navigate replace to="/calculator" /> : <Register />} />
                        <Route path='/calculator/userProfile/:userId' element={<UserProfile></UserProfile>} />
                        <Route path='/calculator/404' element={<NotFound />} />
                        <Route path="/calculator/*" element={ <Navigate replace to="/calculator/404" /> } />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        username:state.reducerMyspace.username,
        is_login:state.reducerMyspace.is_login,
        id:state.reducerMyspace.id,
    }
};

export default connect(mapStateToProps)(App);