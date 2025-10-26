import React, { Component } from 'react';
import Base from './base';
import $ from 'jquery';

class UserList extends Component {
    state = {  } 

    componentDidMount() {
        $.ajax({

        })
    }
    render() { 
        return (
            <Base>
                <div className="card" >
                    <div className="card-body">
                        
                    </div>
                </div>
            </Base>
        );
    }
}
 
export default UserList;