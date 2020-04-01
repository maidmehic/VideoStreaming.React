import React from 'react'
import { Link } from 'react-router-dom';

export class Header extends React.Component {

    render() {
        return (
            <div>
                <div className="ui secondary pointing menu">
                    <Link to="/" className="item">
                        StreamMe
                    </Link>
                    <div className="right menu">
                        <Link to="/" className="item">
                            All Streams
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Header;