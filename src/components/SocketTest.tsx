"use client";

import { useState } from "react";
import {useSocket} from "@/hooks/useSocket";

export default function Chat() {
    const { isConnected, messages, sendMessage } = useSocket();
    const [message, setMessage] = useState("");


    const submit = () => {
        if (message) {
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <div>
            <h2>چت زنده</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={submit} disabled={!isConnected} >ارسال</button>
        </div>
    );
}
