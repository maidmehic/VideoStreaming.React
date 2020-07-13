import React from 'react';
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList() {
        const streams = this.props.streams;
        return (
            Object.keys(streams).map(key => {
                return (
                    <div className="item" key={key}>
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
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        streams: state.streams
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);