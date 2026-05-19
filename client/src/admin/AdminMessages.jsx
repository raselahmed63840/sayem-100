import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const { data } = await api.get("/contact/messages");
      setMessages(data.messages || []);
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markRead = async (id) => {
    try {
      await api.patch(`/contact/messages/${id}/read`);
      loadMessages();
    } catch {
      alert("Failed to mark as read.");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.delete(`/contact/messages/${id}`);
      loadMessages();
    } catch {
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Inquiry Messages</h1>
          <p>View customer product inquiries and contact messages.</p>
        </div>
      </div>

      <div className="admin-message-list">
        {messages.map((msg) => (
          <div
            className={`admin-message-card ${msg.isRead ? "read" : ""}`}
            key={msg._id}
          >
            <div>
              <h3>{msg.subject || "Product Inquiry"}</h3>
              <p>
                <strong>Name:</strong> {msg.name}
              </p>
              <p>
                <strong>Email:</strong> {msg.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {msg.phone || "N/A"}
              </p>
              <p>
                <strong>Product:</strong> {msg.productName || "N/A"}
              </p>
              <p>
                <strong>Message:</strong> {msg.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="admin-actions">
              {!msg.isRead && (
                <button onClick={() => markRead(msg._id)}>Mark Read</button>
              )}
              <button onClick={() => deleteMessage(msg._id)}>Delete</button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="admin-empty">
            <h2>No inquiry messages found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
