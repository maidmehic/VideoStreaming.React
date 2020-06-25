import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {

    renderInput = (formProps) => {//formProps automatically sent by redux-form
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>Title</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        );
    }

    renderTextArea = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>Description</label>
                <textarea {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        );
    }

    renderError({ error, touched }) {
        if (error && touched) {
            return (
                <div style={{ color: "#9f3a38" }}>{error}</div>
            );
        }
    }

    onSubmit = (formValues) => {//handleSubmit won't get called if there are validation errors
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div className="ui form" style={{ marginTop: '20px' }}>
                {/* handleSubmit is callback function provided by redux-form */}
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="title" component={this.renderInput} />
                    <Field name="description" component={this.renderTextArea} />
                    <button className="fluid ui button" type="submit">Submit</button>
                </form>
            </div>

        );
    }

}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title)
        errors.title = "You must enter a title";

    if (!formValues.description)
        errors.description = "You must enter a description";

    return errors;
};

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);