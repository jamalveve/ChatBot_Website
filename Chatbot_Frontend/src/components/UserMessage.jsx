// src/components/UserMessage.jsx
import React from 'react';
import Message from './Message';

// Subclass for User Messages
class UserMessage extends Message {
    getClassName() {
        return "bg-indigo-600 text-white rounded-r";
    }
    render() {
        return (
            <div className="flex justify-end mb-2">
                {super.render()}
            </div>
        );
    }
}

export default UserMessage;
