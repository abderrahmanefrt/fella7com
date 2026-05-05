import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { sellers } from '../data/mockData';

const ChatContext = createContext();

// ==============================
// Message initial AUTO (client)
// ==============================
function generateInitialMessage(sellerId, userId) {
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) return [];

  return [
    {
      id: 'msg_init_' + Date.now(),
      senderId: userId,
      text: `Bonjour ${seller.name}, ce produit est-il disponible ?`,
      timestamp: Date.now(),
      read: true
    }
  ];
}

export function ChatProvider({ children }) {
  const { user } = useAuth();

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('agri_chats');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : {};
  });

  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ==============================
  // Save localStorage
  // ==============================
  useEffect(() => {
    localStorage.setItem('agri_chats', JSON.stringify(conversations));
  }, [conversations]);

  // ==============================
  // Intent detection
  // ==============================
  const detectIntent = (text) => {
    const lower = text.toLowerCase();

    if (lower.match(/\d+/)) return "quantity";
    if (lower.includes("livraison")) return "delivery";
    if (lower.includes("retrait")) return "pickup";
    if (lower.includes("oui")) return "confirm";

    return "default";
  };

  // ==============================
  // Réponse scénario (BOT)
  // ==============================
  const simulateReply = useCallback((conversationId, userMessage) => {
    setConversations(prev => {
      const conv = prev[conversationId];
      if (!conv) return prev;

      let replyText = "";
      let nextStep = conv.step;
      const intent = detectIntent(userMessage);

      switch (conv.step) {
        case 0:
          replyText = "Oui, le produit est disponible 👍. Quelle quantité souhaitez-vous ?";
          nextStep = 1;
          break;

        case 1:
          if (intent === "quantity") {
            replyText = "Parfait 👌. Préférez-vous une livraison 🚚 ou un retrait sur place ?";
            nextStep = 2;
          } else {
            replyText = "Pouvez-vous préciser la quantité souhaitée ?";
          }
          break;

        case 2:
          if (intent === "delivery") {
            replyText = "Très bien 🚚. Pouvez-vous me donner votre adresse ?";
            nextStep = 3;
          } else if (intent === "pickup") {
            replyText = "D'accord 👍. Quand souhaitez-vous passer récupérer la commande ?";
            nextStep = 3;
          } else {
            replyText = "Vous préférez une livraison ou un retrait ?";
          }
          break;

        case 3:
          replyText = "Parfait 🎉. Voulez-vous confirmer la commande ?";
          nextStep = 4;
          break;

        case 4:
          if (intent === "confirm") {
            replyText = "Merci beaucoup 🙏. Votre commande est en cours de traitement.";
            nextStep = 5;
          } else {
            replyText = "Merci de confirmer en répondant par 'oui'.";
          }
          break;

        default:
          replyText = "Avez-vous d'autres questions ?";
      }

      const replyMsg = {
        id: 'msg_' + Date.now() + '_reply',
        senderId: conv.sellerId,
        text: replyText,
        timestamp: Date.now(),
        read: conversationId === activeConversationId
      };

      return {
        ...prev,
        [conversationId]: {
          ...conv,
          step: nextStep,
          messages: [...conv.messages, replyMsg],
          lastMessage: replyText,
          lastTimestamp: Date.now(),
          unreadCount: conversationId === activeConversationId
            ? conv.unreadCount
            : conv.unreadCount + 1
        }
      };
    });
  }, [activeConversationId]);

  // ==============================
  // Ouvrir conversation
  // ==============================
  const openConversation = useCallback((sellerId, sellerName, sellerAvatar) => {
    if (!user) return null;

    const convId = `conv_${user.id}_${sellerId}`;
    let isNew = false;

    setConversations(prev => {
      if (!prev[convId]) {
        isNew = true;

        const initialMessage = generateInitialMessage(sellerId, user.id);

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
            messages: initialMessage,
            lastMessage: initialMessage[0]?.text,
            lastTimestamp: Date.now(),
            unreadCount: 0,
            step: 0
          }
        };
      }
      return prev;
    });

    setActiveConversationId(convId);
    setIsChatOpen(true);

    // 🔥 AUTO réponse vendeur après ouverture
    setTimeout(() => {
      simulateReply(convId, "auto");
    }, 1000);

    return convId;
  }, [user, simulateReply]);

  // ==============================
  // Envoyer message USER
  // ==============================
  const sendMessage = useCallback((conversationId, text) => {
    if (!user || !text.trim()) return;

    const newMsg = {
      id: 'msg_' + Date.now(),
      senderId: user.id,
      text: text.trim(),
      timestamp: Date.now(),
      read: true
    };

    setConversations(prev => {
      const conv = prev[conversationId];
      if (!conv) return prev;

      return {
        ...prev,
        [conversationId]: {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: text.trim(),
          lastTimestamp: Date.now()
        }
      };
    });

    // 🔥 réponse auto du vendeur
    setTimeout(() => {
      simulateReply(conversationId, text);
    }, 1200);

  }, [user, simulateReply]);

  // ==============================
  // Lire messages
  // ==============================
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

  // ==============================
  // Stats
  // ==============================
  const totalUnread = Object.values(conversations).reduce(
    (sum, conv) => sum + (conv.unreadCount || 0),
    0
  );

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