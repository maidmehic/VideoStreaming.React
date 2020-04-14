import React from 'react'
import { connect } from 'react-redux';
import { handleAuthentication } from '../actions'
import "../style/GoogleAuth.css"

class GoogleAuth extends React.Component {

    auth = null;
    state = { displayPopup: false }

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

    onHandleAuthentication() {// this will trigger onAuthChange()
        if (this.props.authStatus.isSignedIn) {
            this.auth.signOut()
            this.togglePopup()
        } else
            this.auth.signIn();
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

    togglePopup() {
        this.setState({ displayPopup: !this.state.displayPopup });
    }

    renderButton() {
        let button;
        const { isSignedIn } = this.props.authStatus;

        if (isSignedIn == null) {
            button = <button className="ui loading button">  Loading  </button>
        } else if (isSignedIn) {
            button =
                <div style={{ marginTop: "3px", outline: "none" }}
                    tabIndex="1"
                    onFocus={() => this.togglePopup()}
                    onBlur={() => this.togglePopup()}>
                    <img
                        alt="profile_photo"
                        src={this.props.authStatus.userInfo.userImageUrl}
                        style={{ borderRadius: "50px", width: "30px" }}
                    />
                    <div style={this.state.displayPopup ? { display: "block" } : { display: "none" }} >
                        {this.renderPopup()}
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

    renderPopup() {
        const { userName, userEmail, userImageUrl } = this.props.authStatus.userInfo;
        return (
            <div className="popup">
                <img alt="profile_photo" src={userImageUrl} />
                <span style={{ fontSize: "initial" }}>{userName}</span>
                <span style={{ color: "grey" }}>{userEmail}</span>
                <div
                    style={{ marginTop: "10px", width: "100%", marginLeft: "3px" }}
                    className="ui google plus button"
                    onClick={() => this.onHandleAuthentication()}>
                    <i className="google icon" />
                    Sign out
                </div >
            </div >
        );
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