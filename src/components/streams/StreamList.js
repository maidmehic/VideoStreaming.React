import React from 'react';
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from 'react-router-dom';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderButtons(stream) {
        if (this.props.isSignedIn && stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderCreateButton() {
        if (this.props.isSignedIn)
            return (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Link to="/streams/new" className="ui basic button">
                        <i className="icon video" />
                          Create new stream
                    </Link>
                </div>
            );
    }

    renderList() {
        const streams = this.props.streams;
        return (
            Object.keys(streams).map(key => {
                return (
                    <div className="item" key={key}>
                        {/* key interpolation */}
                        {this.renderButtons(streams[key])}
                        <i className="large film middle aligned icon"></i>
                        <div className="content">
                            <a className="header">{streams[key].title}</a>
                            <div className="description">{streams[key].description}</div>
                        </div>
                    </div>
                );
            })
        );
    }

    render() {
        return (
            <div className="ui relaxed divided list" style={{ marginBottom: '20px' }}>
                {
                    this.renderList()
                }
                {
                    this.renderCreateButton()
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        streams: state.streams,
        currentUserId: state.authStatus.userInfo?.userId,
        isSignedIn: state.authStatus.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);