import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MenuContext } from '../context/MenuContext';
import { LogOut, Settings, Image as ImageIcon, Users, List, Eye, EyeOff, Receipt } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { totalTables, updateTotalTables, menuItems, toggleItemAvailability, orders } = useContext(MenuContext);
  
  const [activeTab, setActiveTab] = useState('settings');
  const [tableInput, setTableInput] = useState(totalTables);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSaveTables = () => {
    updateTotalTables(Number(tableInput));
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className="admin-container">
      <header className="admin-header glass-panel">
        <div className="admin-title">
          <Settings className="rotate-icon" size={24} color="var(--primary-color)" />
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="admin-nav">
          <button className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            Settings
          </button>
          <button className={`nav-btn ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>
            Menu Management
          </button>
          <button className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            Live Orders
          </button>
        </nav>
        <div className="admin-actions">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="logout-btn">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        {activeTab === 'settings' && (
          <div className="admin-grid animate-fade-in">
            {/* Settings Card */}
            <div className="admin-card glass-panel">
              <div className="card-header">
                <Users size={24} color="var(--primary-color)" />
                <h3>Restaurant Settings</h3>
              </div>
              
              <div className="setting-group">
                <label>Total Available Tables</label>
                <div className="input-with-button">
                  <input 
                    type="number" 
                    min="1"
                    max="200"
                    className="input-field"
                    value={tableInput}
                    onChange={(e) => setTableInput(e.target.value)}
                  />
                  <button className="btn-primary" onClick={handleSaveTables}>
                    {saveStatus || 'Update'}
                  </button>
                </div>
                <p className="hint">This determines the number of tables available for users to book.</p>
              </div>
            </div>

            {/* Menu Image Card */}
            <div className="admin-card glass-panel">
              <div className="card-header">
                <ImageIcon size={24} color="var(--primary-color)" />
                <h3>Current Menu Base</h3>
              </div>
              
              <div className="menu-preview-container">
                <img 
                  src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80" 
                  alt="Pizza Menu Example" 
                  className="menu-preview-img"
                />
                <div className="menu-overlay">
                  <button className="btn-secondary">Upload New Menu Image</button>
                </div>
              </div>
              <p className="hint">The system automatically parses items from the uploaded image. Currently using the default Pizza Party menu.</p>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="admin-menu-management glass-panel animate-fade-in">
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <List size={24} color="var(--primary-color)" />
              <h3>Menu Item Availability</h3>
            </div>
            <div className="menu-list">
              {menuItems.map(item => (
                <div key={item.id} className={`menu-list-item ${!item.available ? 'disabled-item' : ''}`}>
                  <div className="item-info">
                    <img src={item.image} alt={item.name} className="tiny-thumb" />
                    <div>
                      <h4>{item.name}</h4>
                      <span className="cat-badge">{item.category}</span>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${item.available ? 'on' : 'off'}`}
                    onClick={() => toggleItemAvailability(item.id)}
                  >
                    {item.available ? <><Eye size={16}/> Visible</> : <><EyeOff size={16}/> Hidden</>}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="admin-orders animate-fade-in">
            <div className="card-header glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <Receipt size={24} color="var(--primary-color)" />
              <h3>Live Order Tracking</h3>
            </div>
            
            {orders.length === 0 ? (
              <div className="empty-state glass-panel">
                <p>No orders placed yet.</p>
              </div>
            ) : (
              <div className="orders-grid">
                {orders.map(order => (
                  <div key={order.id} className="order-card glass-panel">
                    <div className="order-header">
                      <span className="order-id">{order.id}</span>
                      <span className="order-time">{new Date(order.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="order-table-info">
                      <span className="table-badge">Table {order.table}</span>
                      <span className="payment-badge">{order.paymentMethod}</span>
                    </div>
                    <div className="order-items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <span>{item.quantity}x {item.name}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-total">
                      <span>Total:</span>
                      <span>₹{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
