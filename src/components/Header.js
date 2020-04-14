import React from 'react'
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth'

export class Header extends React.Component {

    render() {
        return (
            <div>
                <div className="ui secondary pointing menu">
                    <Link to="/" className="item">
                        Streamy
                    </Link>
                    <Link to="/streams/new" className="item">
                        Add Stream
                    </Link>
                    <div className="right menu">
                        <GoogleAuth />
                    </div>
                </div>
            </div>
        );
    }
};

export default Header;