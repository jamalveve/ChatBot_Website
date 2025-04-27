// src/components/BotMessage.jsx
import React from 'react';
import Message from './Message';

// Subclass for Bot Messages
class BotMessage extends Message {
    getClassName() {
        return "bg-white border text-indigo-700 rounded-l";
    }
    render() {
        return (
            <div className="flex justify-start mb-2">
                {super.render()}
            </div>
        );
    }
}

export default BotMessage;
