import React from 'react'
import { connect } from 'react-redux';
import { handleAuthentication } from '../actions'

class GoogleAuth extends React.Component {

    auth = null;

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
        this.props.authStatus.isSignedIn ? this.auth.signOut() : this.auth.signIn();// this will trigger onAuthChange()
    }

    onAuthChange = () => {
        let authStatus = {
            isSignedIn: this.auth.isSignedIn.get(),
            userInfo: null
        };

        if (authStatus.isSignedIn) {
            authStatus.userInfo = this.getUserDetails();
        } else
            authStatus.userInfo = null;

        this.props.handleAuthentication(authStatus);
    }

    getUserDetails() {
        return {
            userId: this.auth.currentUser.get().getId(),
            userName: this.auth.currentUser.get().getBasicProfile().getName(),
            userEmail: this.auth.currentUser.get().getBasicProfile().getEmail(),
            userImageUrl: this.auth.currentUser.get().getBasicProfile().getImageUrl()
        };
    }

    renderButton() {
        let button;
        const isSignedIn = this.props.authStatus.isSignedIn;

        if (isSignedIn == null) {
            button =
                <button className="ui loading button">  Loading  </button>
        } else if (isSignedIn) {
            button =
                <div>
                    <button
                        className="ui google plus button"
                        onClick={() => this.onHandleAuthentication()}>
                        <i className="google icon" />
                                Sign out
                    </button>

                    <div style={{ position: "absolute", backgroundColor: 'white', display: 'none' }}>
                        {/* TODO: PUT PROFILE INFO HERE */}
                    </div>
                </div>
        } else {
            button =
                <button
                    className="ui google plus button"
                    onClick={() => this.onHandleAuthentication()}>
                    <i className="google icon" />
                    Sign in
                </button >
        }

        return button;
    }

    render() {
        return (
            <div style={{ marginTop: '1px' }}>
                {
                    this.renderButton()
                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return { authStatus: state.authStatus };
};

export default connect(mapStateToProps, { handleAuthentication })(GoogleAuth);