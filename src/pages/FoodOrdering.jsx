import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { MenuContext } from '../context/MenuContext';
import { ShoppingBag, Search, Plus, Minus, LogOut, ChevronRight, Smartphone, Banknote, CreditCard, X } from 'lucide-react';
import './FoodOrdering.css';

const FoodOrdering = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useContext(CartContext);
  const { menuItems, bookedTable, placeOrder } = useContext(MenuContext);
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Extract unique categories from menuItems
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filter items (only available ones)
  const filteredItems = menuItems.filter(item => {
    if (item.available === false) return false;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    placeOrder({
      table: bookedTable,
      user: user?.name || 'Guest',
      items: cart,
      total: cartTotal,
      paymentMethod: paymentMethod
    });

    setOrderSuccess(true);
    clearCart();
    setTimeout(() => {
      setOrderSuccess(false);
      setShowCheckoutModal(false);
      setIsCartOpen(false);
      navigate('/book-table'); // Or stay here, but standard flow might be to return
    }, 3000);
  };

  return (
    <div className="ordering-container">
      {/* Sidebar / Cart Drawer Overlay */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} color="var(--border-color)" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14}/></button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary w-100" onClick={() => setShowCheckoutModal(true)}>
              Checkout <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal glass-panel animate-fade-in">
            {orderSuccess ? (
              <div className="success-content">
                <div className="success-icon-large">✓</div>
                <h2>Order Placed Successfully!</h2>
                <p>Your food is being prepared.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Select Payment Method</h2>
                  <button className="close-btn" onClick={() => setShowCheckoutModal(false)}><X size={24} /></button>
                </div>
                
                <div className="payment-options">
                  <button 
                    className={`payment-btn ${paymentMethod === 'PhonePe' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('PhonePe')}
                  >
                    <Smartphone size={24} />
                    PhonePe / UPI
                  </button>
                  
                  <button 
                    className={`payment-btn ${paymentMethod === 'Card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('Card')}
                  >
                    <CreditCard size={24} />
                    Credit / Debit Card
                  </button>

                  <button 
                    className={`payment-btn ${paymentMethod === 'Cash' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('Cash')}
                  >
                    <Banknote size={24} />
                    Cash on Table
                  </button>
                </div>

                <div className="checkout-summary">
                  <div className="total-row">
                    <span>Amount to Pay</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="btn-primary w-100 confirm-btn" onClick={handleCheckout}>
                    Confirm Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <header className="top-nav glass-panel">
          <div className="user-info">
            <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
            <div>
              <h3>{user?.name || 'User'}</h3>
              <p>Table {bookedTable || 'Not Booked'}</p>
            </div>
          </div>
          
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search menu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="nav-actions">
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={24} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
            <button className="logout-btn" onClick={logout} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="menu-card glass-panel" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <span className="category-tag">{item.category}</span>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <div>
                    <h3>{item.name}</h3>
                    {item.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.description}</p>}
                  </div>
                  <span className="price">₹{item.price.toFixed(2)}</span>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  <Plus size={18} /> Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodOrdering;
