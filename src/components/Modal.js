import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {

    return ReactDOM.createPortal(
        <div onClick={() => props.dismissModal()} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.message}</div>
                <div className="actions">
                    <button onClick={() => props.onActionClick()} className="ui primary button">{props.buttonTitle}</button>
                    <button onClick={() => props.dismissModal()} className="ui button">Cancel</button>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
};

export default Modal;