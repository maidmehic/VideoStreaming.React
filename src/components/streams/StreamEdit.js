import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, updateStream } from '../../actions'
import StreamForm from './StreamForm'
import _ from 'lodash'

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.updateStream(this.props.stream.id, formValues)
    }

    render() {
        return (
            <div>
                <StreamForm
                    onFormSubmit={(formValues) => this.onSubmit(formValues)}
                    initialValues={this.props.stream && _.pick(this.props.stream, 'title', 'description')}>
                </StreamForm>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};
export default connect(mapStateToProps, { fetchStream, updateStream })(StreamEdit);