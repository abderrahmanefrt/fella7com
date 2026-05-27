import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { sellers, mockProducts } from '../data/mockData';

// ==============================
// Offer / Payment statuses
// ==============================
export const OFFER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUSED: 'refused'
};

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

// ==============================
// Extract quantity from message
// ==============================
function extractQuantity(text) {
  const match = text.match(/(\d+)\s*(kg|tonnes?|quintaux?|t|q|g)?/i);
  if (match) {
    return match[0];
  }
  return '10kg';
}

// ==============================
// Parse a numeric quantity string → number
// e.g. "50kg" → 50, "2 Tonnes" → 2000, "3 quintaux" → 300
// ==============================
function parseQuantityToKg(qtyStr) {
  const match = qtyStr.match(/(\d+\.?\d*)\s*(kg|tonnes?|t|quintaux?|q|g)?/i);
  if (!match) return 10;
  const num = parseFloat(match[1]);
  const unit = (match[2] || 'kg').toLowerCase();
  if (unit.startsWith('t')) return num * 1000;
  if (unit.startsWith('q')) return num * 100;
  if (unit === 'g') return num / 1000;
  return num; // kg
}

// ==============================
// Parse price string like "5 800 DA" → 5800
// ==============================
function parsePriceString(priceStr) {
  if (!priceStr) return 0;
  const cleaned = String(priceStr).replace(/[^\d.,]/g, '').replace(/\s/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
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
  // Réponse scénario (BOT) — UPGRADED with auto offer
  // ==============================
  const simulateReply = useCallback((conversationId, userMessage) => {
    setConversations(prev => {
      const conv = prev[conversationId];
      if (!conv) return prev;

      let replyText = "";
      let nextStep = conv.step;
      let offerMsg = null;
      const intent = detectIntent(userMessage);

      switch (conv.step) {
        case 0:
          replyText = "Oui, le produit est disponible 👍. Quelle quantité souhaitez-vous ?";
          nextStep = 1;
          break;

        case 1:
          if (intent === "quantity") {
            const qty = extractQuantity(userMessage);
            replyText = "Parfait 👌. Préférez-vous une livraison 🚚 ou un retrait sur place ?";
            nextStep = 2;
            // Store quantity for later
            conv._qty = qty;
          } else {
            replyText = "Pouvez-vous préciser la quantité souhaitée ?";
          }
          break;

        case 2:
          if (intent === "delivery") {
            replyText = "Très bien 🚚. Pouvez-vous me donner votre adresse ?";
            nextStep = 3;
            conv._delivery = true;
          } else if (intent === "pickup") {
            replyText = "D'accord 👍. Quand souhaitez-vous passer récupérer la commande ?";
            nextStep = 3;
            conv._delivery = false;
          } else {
            replyText = "Vous préférez une livraison ou un retrait ?";
          }
          break;

        case 3:
          replyText = "Parfait 🎉. Je vous prépare le récapitulatif de commande avec le lien de paiement...";
          nextStep = 4;
          break;

        case 4:
          // This step is handled specially — the seller sends the offer card
          // We won't reach here normally because step 4 auto-generates the offer
          replyText = "Avez-vous d'autres questions ?";
          break;

        default:
          replyText = "Avez-vous d'autres questions ?";
      }

      const replyMsgObj = {
        id: 'msg_' + Date.now() + '_reply',
        senderId: conv.sellerId,
        text: replyText,
        timestamp: Date.now(),
        read: conversationId === activeConversationId
      };

      const newMessages = [...conv.messages, replyMsgObj];

      // If we just moved to step 4, auto-generate the offer card after a short delay
      const updatedConv = {
        ...conv,
        step: nextStep,
        _qty: conv._qty,
        _delivery: conv._delivery,
        messages: newMessages,
        lastMessage: replyText,
        lastTimestamp: Date.now(),
        unreadCount: conversationId === activeConversationId
          ? conv.unreadCount
          : conv.unreadCount + 1
      };

      return {
        ...prev,
        [conversationId]: updatedConv
      };
    });

    // Check if we need to send an offer card (step 3 → 4)
    setTimeout(() => {
      setConversations(prev => {
        const conv = prev[conversationId];
        if (!conv || conv.step !== 4) return prev;
        // Check if offer was already sent
        if (conv.messages.some(m => m.type === 'offer')) return prev;

        // ─── Real price calculation from product data ───
        const seller = sellers.find(s => s.id === conv.sellerId);
        const linkedProduct = conv.productId
          ? mockProducts.find(p => p.id === conv.productId)
          : mockProducts.find(p => p.sellerId === conv.sellerId);

        const productName = linkedProduct
          ? linkedProduct.title
          : (conv.productTitle || (seller?.name ? `Produit de ${seller.name}` : 'Produit agricole'));

        const qty = conv._qty || '10kg';
        const hasDelivery = conv._delivery !== false;

        // Parse unit price from product data (e.g. "5 800 DA" → 5800)
        const unitPrice = linkedProduct ? parsePriceString(linkedProduct.price) : 500;
        const productUnit = linkedProduct?.unit || '/kg';

        // Parse user-requested quantity to numeric kg
        const qtyNumeric = parseQuantityToKg(qty);

        // Calculate total: unit price × quantity
        // If unit is /tête, /plateau, /plant etc., use quantity as count
        const isPerUnit = productUnit.includes('tête') || productUnit.includes('plateau') || productUnit.includes('plant') || productUnit.includes('unité');
        const basePrice = isPerUnit
          ? Math.round(unitPrice * qtyNumeric)
          : Math.round(unitPrice * qtyNumeric);

        const deliveryFee = hasDelivery ? Math.round(basePrice * 0.05 + 500) : 0; // 5% + 500 DA base
        const totalPrice = basePrice + deliveryFee;

        const offerCard = {
          id: 'msg_offer_' + Date.now(),
          senderId: conv.sellerId,
          type: 'offer',
          timestamp: Date.now(),
          read: conversationId === activeConversationId,
          offer: {
            id: 'offer_' + Date.now(),
            product: productName,
            quantity: qty,
            unitPrice: unitPrice,
            unitLabel: productUnit,
            price: basePrice,
            delivery: deliveryFee,
            total: totalPrice,
            status: OFFER_STATUS.PENDING,
            createdAt: Date.now()
          }
        };

        return {
          ...prev,
          [conversationId]: {
            ...conv,
            messages: [...conv.messages, offerCard],
            lastMessage: `🌾 Offre: ${productName} — ${basePrice + deliveryFee} DA`,
            lastTimestamp: Date.now(),
            step: 5 // Mark as offer sent
          }
        };
      });
    }, 2000);

  }, [activeConversationId]);

  // ==============================
  // Ouvrir conversation
  // ==============================
  const openConversation = useCallback((sellerId, sellerName, sellerAvatar, productId, productTitle) => {
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
            step: 0,
            productId: productId || null,
            productTitle: productTitle || null
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
  // Payer une offre (CLIENT)
  // ==============================
  const payOffer = useCallback((conversationId, offerId) => {
    if (!user) return;

    setConversations(prev => {
      const conv = prev[conversationId];
      if (!conv) return prev;

      // Update the offer status in the message
      const updatedMessages = conv.messages.map(msg => {
        if (msg.type === 'offer' && msg.offer?.id === offerId) {
          return {
            ...msg,
            offer: {
              ...msg.offer,
              status: OFFER_STATUS.PAID,
              paidAt: Date.now()
            }
          };
        }
        return msg;
      });

      // Add a system message
      const paidMsg = {
        id: 'msg_paid_' + Date.now(),
        senderId: 'system',
        type: 'system',
        text: '✅ Paiement effectué avec succès ! Votre commande est confirmée.',
        timestamp: Date.now(),
        read: true
      };

      return {
        ...prev,
        [conversationId]: {
          ...conv,
          messages: [...updatedMessages, paidMsg],
          lastMessage: '✅ Paiement confirmé',
          lastTimestamp: Date.now()
        }
      };
    });

    // Seller reacts after payment
    setTimeout(() => {
      setConversations(prev => {
        const conv = prev[conversationId];
        if (!conv) return prev;

        const replyMsg = {
          id: 'msg_' + Date.now() + '_seller_thanks',
          senderId: conv.sellerId,
          text: 'Paiement reçu ! 🎉 Merci beaucoup. Votre commande est en cours de préparation. Vous recevrez une notification quand elle sera prête. Bonne journée ! 🙏',
          timestamp: Date.now(),
          read: conversationId === activeConversationId
        };

        return {
          ...prev,
          [conversationId]: {
            ...conv,
            messages: [...conv.messages, replyMsg],
            lastMessage: replyMsg.text,
            lastTimestamp: Date.now()
          }
        };
      });
    }, 1500);
  }, [user, activeConversationId]);

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
      payOffer,
      markAsRead,
      totalUnread
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);