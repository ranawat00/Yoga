import './ChatAssistant.css';
import React, { useState, useEffect, useRef } from 'react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hari Om! 🙏 I am Prana, your Yoga Healers guide. How can I assist you on your natural healing journey today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      const text = userMessage.text.toLowerCase();

      if (text.includes('enema') || text.includes('cleanse') || text.includes('detox')) {
        replyText = 'For physical detox, we recommend using our Premium Enema Kit with lukewarm water (no soap/chemicals). Do it daily on an empty stomach for the first 21 days. It is extremely safe and helps clear decades-old toxins!';
      } else if (text.includes('thyroid') || text.includes('diabetes') || text.includes('weight') || text.includes('bp') || text.includes('disease')) {
        replyText = 'Yes! Lifestyle disorders like Thyroid, Diabetes, and High BP can be successfully reversed. By eliminating milk, refined oils, and tea/coffee, and introducing daily pranayama and green juices, our community members have completely stopped their medications. Check out our "Healing Stories" section above!';
      } else if (text.includes('diet') || text.includes('eat') || text.includes('food') || text.includes('recipe')) {
        replyText = 'A Yoga Healers diet focuses on high-water, raw, or lightly cooked plant foods. Avoid dairy, animal products, white sugar, and processed items. Try starting your morning with ash gourd juice, having sprouts for breakfast, and an oil-free vegetable curry for lunch!';
      } else if (text.includes('yoga') || text.includes('exercise') || text.includes('pranayama')) {
        replyText = 'We practice daily Yoga Asanas to strengthen the body and Pranayama (like Anulom Vilom & Kapalbhati) to cleanse the nervous system. We hold live practices in our 21-Day Challenge at 6:00 AM and 6:00 PM IST.';
      } else if (text.includes('price') || text.includes('cost') || text.includes('register') || text.includes('workshop')) {
        replyText = 'Our live Zoom workshops range from ₹499 (3-Day Cooking Class) to ₹1,499 (21-Day Yoga & Detox Challenge). You can easily register by clicking "Register Now" under the Workshops section above!';
      } else if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
        replyText = 'Hello! Nice to connect with you. How can I guide you today? You can ask me about diet, yoga asanas, enemas, or our challenges.';
      } else {
        replyText = 'That is a beautiful inquiry. To get personalized guidance and step-by-step support from our founders, I highly recommend joining our upcoming 21-Day Yoga & Detox Challenge!';
      }

      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: replyText
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className="floating-chat-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Box Panel */}
      {isOpen && (
        <div className="chat-box-card">
          <div className="chat-header">
            <span className="chat-title">Prana - AI Health Guide</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
              aria-label="Minimize chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg bot" style={{ display: 'flex', gap: '4px', padding: '0.5rem 0.8rem' }}>
                <span style={{ animation: 'bounce 0.8s infinite 0.1s', display: 'inline-block' }}>●</span>
                <span style={{ animation: 'bounce 0.8s infinite 0.3s', display: 'inline-block' }}>●</span>
                <span style={{ animation: 'bounce 0.8s infinite 0.5s', display: 'inline-block' }}>●</span>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                  }
                `}} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about enema, diet, thyroid..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label="Chat query input"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
