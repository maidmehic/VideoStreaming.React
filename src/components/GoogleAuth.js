import React from 'react'
import { connect } from 'react-redux';
import { handleAuthentication } from '../actions'

class GoogleAuth extends React.Component {

    auth = null

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '49063041089-fvajnlpn2u69eidnbesrshruml2ep0rp.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange();

                this.auth.isSignedIn.listen(this.onAuthChange);//listen to authentication status changes
            }, () => {
                console.log("Error has occured while initializing google client");
            });
        });
    }

    onHandleAuthentication() {
        this.props.isSignedIn ? this.auth.signOut() : this.auth.signIn();
    }

    onAuthChange = () => {
        const authStatus = {//if user is not signed in, getId() will return null
            isSignedIn: this.auth.isSignedIn.get(),
            userId: this.auth.currentUser.get().getId()
        }

        this.props.handleAuthentication(authStatus);
    }

    render() {
        return (
            <div style={{ marginTop: "1px" }}>
                {
                    this.props.isSignedIn === null ?
                        <button
                            className="ui loading google plus button">
                            Loading
                            </button>
                        :
                        <button
                            className="ui google plus button"
                            onClick={() => this.onHandleAuthentication()}>
                            <i className="google icon"></i>
                            {this.props.isSignedIn ? "Sign out" : "Sign in"}
                        </button>
                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return { isSignedIn: state.authStatus.isSignedIn };
};

export default connect(mapStateToProps, { handleAuthentication })(GoogleAuth);