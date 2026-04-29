import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../context/MenuContext';
import { AuthContext } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import './TableBooking.css';

const TableBooking = () => {
  const { totalTables, bookTable, bookedTables } = useContext(MenuContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Create an array of tables based on totalTables
  const tables = Array.from({ length: totalTables }, (_, i) => i + 1);

  const handleTableClick = (tableNum) => {
    if (bookedTables.includes(tableNum)) return;
    
    bookTable(tableNum, user?.id);
    navigate('/order');
  };

  return (
    <div className="booking-container">
      <header className="booking-header glass-panel">
        <div className="user-info">
          <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
          <div>
            <h3>Welcome, {user?.name || 'Guest'}</h3>
            <p>Please select your table</p>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">
          <LogOut size={20} />
        </button>
      </header>

      <main className="booking-main">
        <div className="booking-info">
          <h2>Select a Table</h2>
          <div className="legend">
            <div className="legend-item">
              <div className="table-box available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="table-box occupied"></div>
              <span>Occupied</span>
            </div>
          </div>
        </div>

        <div className="tables-grid">
          {tables.map(table => {
            const isOccupied = bookedTables.includes(table);
            return (
              <button
                key={table}
                className={`table-card ${isOccupied ? 'occupied' : 'available'}`}
                onClick={() => handleTableClick(table)}
                disabled={isOccupied}
              >
                T-{table}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TableBooking;
