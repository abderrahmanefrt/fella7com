import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { sellers } from '../data/mockData';

const ChatContext = createContext();

// Generate mock initial messages for a conversation
function generateMockMessages(sellerId, userId) {
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) return [];

  return [
    {
      id: 'msg_init_1',
      senderId: userId,
      text: `Bonjour ${seller.name}, je suis intéressé par vos produits. Sont-ils toujours disponibles ?`,
      timestamp: Date.now() - 3600000,
      read: true
    },
    {
      id: 'msg_init_2',
      senderId: sellerId,
      text: `Bonjour ! Oui, bien sûr. Quelle quantité souhaitez-vous ?`,
      timestamp: Date.now() - 3500000,
      read: true
    }
  ];
}

export function ChatProvider({ children }) {
  const { user } = useAuth();

  // conversations: { [conversationId]: { sellerId, sellerName, sellerAvatar, messages[], lastMessage, unreadCount } }
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('agri_chats');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : {};
  });

  // Track which conversation is currently open
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Persist conversations
  useEffect(() => {
    localStorage.setItem('agri_chats', JSON.stringify(conversations));
  }, [conversations]);

  // Get or create a conversation with a seller
  const openConversation = useCallback((sellerId, sellerName, sellerAvatar) => {
    if (!user) return null;

    const convId = `conv_${user.id}_${sellerId}`;

    setConversations(prev => {
      if (!prev[convId]) {
        const mockMsgs = generateMockMessages(sellerId, user.id);
        return {
          ...prev,
          [convId]: {
            id: convId,
            sellerId,
            sellerName: sellerName || 'Vendeur',
            sellerAvatar: sellerAvatar || '',
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatar,
            messages: mockMsgs,
            lastMessage: mockMsgs.length > 0 ? mockMsgs[mockMsgs.length - 1].text : '',
            lastTimestamp: mockMsgs.length > 0 ? mockMsgs[mockMsgs.length - 1].timestamp : Date.now(),
            unreadCount: 0
          }
        };
      }
      return prev;
    });

    setActiveConversationId(convId);
    setIsChatOpen(true);

    return convId;
  }, [user]);

  // Send a message
  const sendMessage = useCallback((conversationId, text) => {
    if (!user || !text.trim()) return;

    const newMsg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      senderId: user.id,
      text: text.trim(),
      timestamp: Date.now(),
      read: false
    };

    setConversations(prev => {
      const conv = prev[conversationId];
      if (!conv) return prev;

      const updatedConv = {
        ...conv,
        messages: [...conv.messages, newMsg],
        lastMessage: text.trim(),
        lastTimestamp: Date.now()
      };

      return { ...prev, [conversationId]: updatedConv };
    });

    // Simulate a seller reply after 1.5 seconds
    setTimeout(() => {
      simulateReply(conversationId);
    }, 1500);
  }, [user]);

  // Simulate a seller auto-reply
  const simulateReply = useCallback((conversationId) => {
    const replies = [
      "Merci pour votre message ! Je vérifie la disponibilité et je reviens vers vous.",
      "Très bien, nous pouvons organiser la livraison. Quelle est votre adresse ?",
      "Le prix est négociable pour les grandes quantités. Vous souhaitez combien ?",
      "Oui, c'est toujours disponible. Quand souhaitez-vous passer la commande ?",
      "Bien reçu ! Je vous envoie les détails par la suite.",
      "Merci pour votre intérêt. N'hésitez pas si vous avez d'autres questions.",
      "Je peux vous faire un prix spécial pour cette quantité. Ça vous intéresse ?",
      "La qualité est garantie. Nous avons des certifications à jour."
    ];

    const replyText = replies[Math.floor(Math.random() * replies.length)];

    setConversations(prev => {
      const conv = prev[conversationId];
      if (!conv) return prev;

      const replyMsg = {
        id: 'msg_' + Date.now() + '_reply',
        senderId: conv.sellerId,
        text: replyText,
        timestamp: Date.now(),
        read: conversationId === activeConversationId
      };

      const updatedConv = {
        ...conv,
        messages: [...conv.messages, replyMsg],
        lastMessage: replyText,
        lastTimestamp: Date.now(),
        unreadCount: conversationId === activeConversationId
          ? conv.unreadCount
          : conv.unreadCount + 1
      };

      return { ...prev, [conversationId]: updatedConv };
    });
  }, [activeConversationId]);

  // Mark messages as read
  const markAsRead = useCallback((conversationId) => {
    setConversations(prev => {
      const conv = prev[conversationId];
      if (!conv) return prev;

      return {
        ...prev,
        [conversationId]: {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(m => ({ ...m, read: true }))
        }
      };
    });
  }, []);

  // Total unread count
  const totalUnread = Object.values(conversations).reduce(
    (sum, conv) => sum + (conv.unreadCount || 0),
    0
  );

  // Get user's conversations sorted by last timestamp
  const userConversations = Object.values(conversations)
    .filter(conv => conv.userId === user?.id)
    .sort((a, b) => (b.lastTimestamp || 0) - (a.lastTimestamp || 0));

  return (
    <ChatContext.Provider value={{
      conversations,
      userConversations,
      activeConversationId,
      setActiveConversationId,
      isChatOpen,
      setIsChatOpen,
      openConversation,
      sendMessage,
      markAsRead,
      totalUnread
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
