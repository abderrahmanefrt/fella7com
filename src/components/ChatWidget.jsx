import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowLeft, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import './ChatWidget.css';

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
  if (date.toDateString() === yesterday.toDateString()) return 'Hier';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

// Group messages by date
function groupMessagesByDate(messages) {
  const groups = [];
  let currentDate = '';
  messages.forEach(msg => {
    const dateStr = new Date(msg.timestamp).toDateString();
    if (dateStr !== currentDate) {
      currentDate = dateStr;
      groups.push({ type: 'date', date: formatDate(msg.timestamp), key: 'date_' + dateStr });
    }
    groups.push({ type: 'message', ...msg, key: msg.id });
  });
  return groups;
}

// Conversation List View
function ConversationList({ onSelectConversation }) {
  const { userConversations } = useChat();

  if (userConversations.length === 0) {
    return (
      <div className="chat-empty-state">
        <MessageCircle size={40} strokeWidth={1.2} />
        <p>Aucune conversation</p>
        <span>Contactez un vendeur depuis une annonce pour démarrer une conversation.</span>
      </div>
    );
  }

  return (
    <div className="chat-conv-list">
      {userConversations.map(conv => (
        <button
          key={conv.id}
          className={`chat-conv-item ${conv.unreadCount > 0 ? 'unread' : ''}`}
          onClick={() => onSelectConversation(conv.id)}
        >
          <div className="chat-conv-avatar">
            {conv.sellerAvatar ? (
              <img src={conv.sellerAvatar} alt="" />
            ) : (
              <div className="chat-avatar-placeholder">
                {(conv.sellerName || 'V')[0]}
              </div>
            )}
            {conv.unreadCount > 0 && (
              <span className="chat-conv-badge">{conv.unreadCount}</span>
            )}
          </div>
          <div className="chat-conv-info">
            <div className="chat-conv-top">
              <span className="chat-conv-name">{conv.sellerName}</span>
              <span className="chat-conv-time">{formatTime(conv.lastTimestamp)}</span>
            </div>
            <p className="chat-conv-preview">{conv.lastMessage}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// Message Thread View
function MessageThread({ conversationId, onBack }) {
  const { user } = useAuth();
  const { conversations, sendMessage, markAsRead } = useChat();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const conv = conversations[conversationId];

  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId);
    }
  }, [conversationId, markAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conv?.messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [conversationId]);

  if (!conv) return null;

  const items = groupMessagesByDate(conv.messages);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(conversationId, input);
    setInput('');
    // Show typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-thread">
      <div className="chat-thread-header">
        <button className="chat-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div className="chat-thread-avatar">
          {conv.sellerAvatar ? (
            <img src={conv.sellerAvatar} alt="" />
          ) : (
            <div className="chat-avatar-placeholder">
              {(conv.sellerName || 'V')[0]}
            </div>
          )}
          <span className="chat-online-dot"></span>
        </div>
        <div className="chat-thread-info">
          <span className="chat-thread-name">{conv.sellerName}</span>
          <span className="chat-thread-status">En ligne</span>
        </div>
      </div>

      <div className="chat-messages">
        {items.map(item => {
          if (item.type === 'date') {
            return (
              <div key={item.key} className="chat-date-separator">
                <span>{item.date}</span>
              </div>
            );
          }
          const isMe = item.senderId === user?.id;
          return (
            <div key={item.key} className={`chat-bubble-wrapper ${isMe ? 'sent' : 'received'}`}>
              <div className={`chat-bubble ${isMe ? 'chat-bubble-sent' : 'chat-bubble-received'}`}>
                <p>{item.text}</p>
                <span className="chat-bubble-time">{formatTime(item.timestamp)}</span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-bubble-wrapper received">
            <div className="chat-bubble chat-bubble-received chat-typing">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Écrire un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`chat-send-btn ${input.trim() ? 'active' : ''}`}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

// Main Chat Widget (floating)
export default function ChatWidget() {
  const { user } = useAuth();
  const { isChatOpen, setIsChatOpen, activeConversationId, setActiveConversationId, totalUnread } = useChat();
  const [view, setView] = useState('list'); // 'list' | 'thread'

  // When activeConversationId changes externally (from listing page), go to thread
  useEffect(() => {
    if (activeConversationId && isChatOpen) {
      setView('thread');
    }
  }, [activeConversationId, isChatOpen]);

  if (!user) return null;

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setView('list');
      setActiveConversationId(null);
    } else {
      setIsChatOpen(true);
      setView('list');
    }
  };

  const handleSelectConversation = (convId) => {
    setActiveConversationId(convId);
    setView('thread');
  };

  const handleBack = () => {
    setView('list');
    setActiveConversationId(null);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chat-fab ${isChatOpen ? 'open' : ''}`}
        onClick={toggleChat}
        title={isChatOpen ? 'Fermer le chat' : 'Messages'}
        id="chat-toggle-button"
      >
        {isChatOpen ? <ChevronDown size={24} /> : <MessageCircle size={24} />}
        {!isChatOpen && totalUnread > 0 && (
          <span className="chat-fab-badge">{totalUnread > 9 ? '9+' : totalUnread}</span>
        )}
      </button>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="chat-panel animate-slide-up">
          <div className="chat-panel-header">
            <h3>💬 Messages</h3>
          </div>

          {view === 'list' ? (
            <ConversationList onSelectConversation={handleSelectConversation} />
          ) : (
            <MessageThread
              conversationId={activeConversationId}
              onBack={handleBack}
            />
          )}
        </div>
      )}
    </>
  );
}
