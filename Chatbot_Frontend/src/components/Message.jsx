// src/components/Message.jsx
import React from 'react';

// Base class
class Message extends React.Component {
    render() {
        const { sender, text } = this.props;
        return (
            <div className={`px-4 py-2 rounded-lg ${this.getClassName()} `}>
                {text}
            </div>
        );
    }
    getClassName() {
        return "base-message";
    }
}

export default Message;
