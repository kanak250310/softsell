// SoftSell.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FaLock, FaBolt, FaSearch, FaHeadset,
  FaUpload, FaDollarSign, FaMoneyCheckAlt,
  FaSun, FaMoon, FaRobot, FaTimes
} from "react-icons/fa";
import "./index.css";

// Remove the API key from here!

const exampleQuestions = [
  "How do I sell my license?",
  "What license types do you support?",
  "How long does it take to get paid?",
];

const SoftSell = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful customer support assistant for SoftSell." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      if (
        e.target.matches('a[href^="#"]') &&
        e.target.getAttribute("href") !== "#"
      ) {
        const targetId = e.target.getAttribute("href").slice(1);
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleScroll);
    return () => document.removeEventListener("click", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [darkMode]);
  
  // Scroll chat to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Call GroqCloud API (not for production! Put key server-side for production)
  const sendMessageToAI = async (userMessage) => {
    setIsLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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", // <-- Replace with real key or use secure proxy
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a helpful customer support assistant for SoftSell." },
            ...messages.filter(m => m.role !== "system"),
            { role: "user", content: userMessage },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      const aiMessage = data.choices[0].message.content.trim();

      setMessages(msgs => [
        ...msgs,
        { role: "user", content: userMessage },
        { role: "assistant", content: aiMessage }
      ]);
    } catch (error) {
      setMessages(msgs => [
        ...msgs,
        { role: "user", content: userMessage },
        { role: "assistant", content: "Sorry, something went wrong. Please try again later." }
      ]);
      console.error("GroqCloud API error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessageToAI(inputValue.trim());
    setInputValue("");
  };

  const handleExampleClick = (question) => {
    sendMessageToAI(question);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="softsell">
      {/* HEADER / NAVIGATION */}
      <header className="site-header">
        <div className="navbar-container">
          <div className="logo-placeholder gradient-logo">
            <li><a href="#hero">SoftSell</a></li>
          </div>
          <nav className="main-nav" aria-label="Main navigation">
            <ul>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#why-us">Why Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <button
            className="theme-toggle"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-left">
          <div className="hero-content">
            <h1>Empowering Software Resale</h1>
            <p>Your trusted partner in license valuation and selling</p>
            <button className="cta-button">Get a Quote</button>
          </div>
        </div>
        <div className="hero-right"></div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="icon-wrapper">
              <FaUpload size={32} />
            </div>
            <h3>Upload License</h3>
            <p>Submit your software license securely through our platform.</p>
          </div>
          <div className="step">
            <div className="icon-wrapper">
              <FaDollarSign size={32} />
            </div>
            <h3>Get Valuation</h3>
            <p>We evaluate your license value instantly using smart analytics.</p>
          </div>
          <div className="step">
            <div className="icon-wrapper">
              <FaMoneyCheckAlt size={32} />
            </div>
            <h3>Get Paid</h3>
            <p>Get quick, secure payment directly to your account.</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-us" id="why-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <div className="icon-wrapper">
              <FaLock size={30} />
            </div>
            <p>Bank-level secure transactions</p>
          </div>
          <div className="feature">
            <div className="icon-wrapper">
              <FaBolt size={30} />
            </div>
            <p>Fast and reliable payments</p>
          </div>
          <div className="feature">
            <div className="icon-wrapper">
              <FaSearch size={30} />
            </div>
            <p>Expert license valuation</p>
          </div>
          <div className="feature">
            <div className="icon-wrapper">
              <FaHeadset size={30} />
            </div>
            <p>Dedicated support team</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials" id="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="reviews">
          <div className="review">
            <span className="quote">“</span>
            <p>SoftSell made selling licenses hassle-free. I got paid within hours!</p>
            <strong>— John Doe, CTO, NexaTech</strong>
          </div>
          <div className="review">
            <span className="quote">“</span>
            <p>The valuation was instant and fair. I highly recommend their service.</p>
            <strong>— Jane Smith, Manager, CodeHive</strong>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Your Company" required />
          <select required>
            <option value="">Select License Type</option>
            <option>Software</option>
            <option>SaaS</option>
            <option>Other</option>
          </select>
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">© 2025 SoftSell. All rights reserved.</footer>

      {/* AI CHAT WIDGET TOGGLE BUTTON */}
      <button
        className={`chat-toggle-button ${chatOpen ? "open" : ""}`}
        aria-label={chatOpen ? "Close chat" : "Open chat"}
        onClick={() => setChatOpen(prev => !prev)}
      >
        {chatOpen ? <FaTimes size={20} /> : <FaRobot size={20} />}
      </button>

      {/* AI CHAT WIDGET */}
      {chatOpen && (
        <div className={`chat-widget ${darkMode ? "darkmode" : ""}`} role="dialog" aria-modal="true" aria-label="Customer support chat">
          <div className="chat-header">
            <h3>SoftSell Support</h3>
            <button aria-label="Close chat" onClick={() => setChatOpen(false)}><FaTimes /></button>
          </div>
          <div className="chat-messages" aria-live="polite">
            {messages.filter(m => m.role !== "system").map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <span>{msg.content}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-examples">
            <small>Try an example question:</small>
            <div className="chat-example-buttons">
              {exampleQuestions.map((q, i) => (
                <button key={i} onClick={() => handleExampleClick(q)}>{q}</button>
              ))}
            </div>
          </div>
          <div className="chat-input-area">
            <textarea
              rows={2}
              value={inputValue}
              placeholder="Ask a question..."
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Type your question"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading} aria-label="Send message">
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftSell;