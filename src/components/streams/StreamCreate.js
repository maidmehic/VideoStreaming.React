import React from 'react';
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm"
class StreamCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <StreamForm
                    onFormSubmit={(formValues) => this.onSubmit(formValues)}>
                </StreamForm>
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);