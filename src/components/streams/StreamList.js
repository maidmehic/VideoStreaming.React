import React from 'react';
import { connect } from "react-redux";
import { fetchStreams, deleteStream } from "../../actions";
import { Link } from 'react-router-dom';
import Modal from '../Modal';

class StreamList extends React.Component {

    state = { showDeleteModal: false, selectedStreamForDelete: null }

    componentDidMount() {
        this.props.fetchStreams();
    }

    showDeleteModal = (stream) => {
        this.setState({ showDeleteModal: true, selectedStreamForDelete: stream });
    }

    dismissDeleteModal = () => {
        this.setState({ showDeleteModal: false, selectedStreamForDelete: null });
    }

    deleteStream = () => {
        this.props.deleteStream(this.state.selectedStreamForDelete.id)
        this.dismissDeleteModal();
    }

    renderButtons(stream) {
        if (this.props.isSignedIn && stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <button onClick={() => this.showDeleteModal(stream)} className="ui button negative">
                        Delete
                    </button>
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
                        <Link to={`/streams/${key}`} className="content">
                            <div style={{ color: '#4183c4' }} className="header">{streams[key].title}</div>
                            <div className="description">{streams[key].description}</div>
                        </Link>
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
                {
                    this.state.showDeleteModal
                        ?
                        <Modal
                            dismissModal={() => this.dismissDeleteModal()}
                            title="Delete stream"
                            message={`Are you sure you want to delete ${this.state.selectedStreamForDelete.title} stream?`}
                            buttonTitle="Delete"
                            onActionClick={() => this.deleteStream()}
                        />
                        :
                        null
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

export default connect(mapStateToProps, { fetchStreams, deleteStream })(StreamList);