import React, { createContext, useState, useEffect } from 'react';

export const MenuContext = createContext();

const initialPizzaMenu = [
  // SINGLE TOPPING PIZZA
  { id: 101, name: 'Onion Pizza', category: 'Single Topping Pizza', price: 139, image: 'https://images.unsplash.com/photo-1590823616609-b68ab3054191?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 102, name: 'Capsicum Pizza', category: 'Single Topping Pizza', price: 139, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 103, name: 'Tomato Pizza', category: 'Single Topping Pizza', price: 139, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 104, name: 'Corn Pizza', category: 'Single Topping Pizza', price: 139, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 105, name: 'Panner Pizza', category: 'Single Topping Pizza', price: 149, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80', available: true },
  
  // LOVERS RANGE
  { id: 201, name: 'Margherita Pizza', category: 'Lovers Range', price: 149, description: 'Single Cheese Topping', image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 202, name: 'Spicy Vegglee', category: 'Lovers Range', price: 149, description: 'Onion, Tomato, Green Chilli & Cheese', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 203, name: 'Veggie Crunch', category: 'Lovers Range', price: 149, description: 'Onion, Capsicum & Cheese', image: 'https://images.unsplash.com/photo-1541745537411-b8046bc6e662?auto=format&fit=crop&w=400&q=80', available: true },
  
  // SIGNATURE RANGE
  { id: 301, name: 'Double Cheese', category: 'Signature Range', price: 169, description: 'Double Cheese Topping', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 302, name: 'Mexican', category: 'Signature Range', price: 169, description: 'Onion, Capsicum, Jalapeno & Tomato', image: 'https://images.unsplash.com/photo-1590823616609-b68ab3054191?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 303, name: 'Country Fest', category: 'Signature Range', price: 200, description: 'Onion, Capsicum, Tomato & Cheese', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 304, name: 'Peppy Panner', category: 'Signature Range', price: 200, description: 'Capsicum, Panner, Red Paprika & Cheese', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80', available: true },
  
  // SPL. PANNER RANGE
  { id: 401, name: 'Corn Paneer', category: 'Spl. Panner Range', price: 200, description: 'Corn, Paneer & Tandoori Gravy', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 402, name: 'Tandoori Onion Paneer', category: 'Spl. Panner Range', price: 200, description: 'Onion, Paneer & Tandoori Gravy', image: 'https://images.unsplash.com/photo-1590823616609-b68ab3054191?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 403, name: 'Spicy Onion Paneer', category: 'Spl. Panner Range', price: 210, description: 'Onion, Paneer, Cheese & Hand Made Spicy Gravy', image: 'https://images.unsplash.com/photo-1541745537411-b8046bc6e662?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 404, name: 'Shahi Onion Paneer', category: 'Spl. Panner Range', price: 210, description: 'Onion, Paneer, Cheese & Hand Made Shahi Gravy', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 405, name: 'Double Cheese Tandoori', category: 'Spl. Panner Range', price: 200, description: 'Double Cheese with Tandoori Gravy', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', available: true },
  
  // SUPREME RANGE
  { id: 501, name: 'Tandoori Paneer', category: 'Supreme Range', price: 250, description: 'Onion, Capsicum, Red Paprika Paneer, Tandoori Sauce & Cheese', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 502, name: 'Makhani Paneer', category: 'Supreme Range', price: 250, description: 'Onion, Capsicum, Red Paprika Paneer, Makhni Sauce & Cheese', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 503, name: 'Veg Extra Vaganzaa', category: 'Supreme Range', price: 250, description: 'Onion, Capsicum, Red Paprika Paneer, Makhni Sauce & Cheese', image: 'https://images.unsplash.com/photo-1590823616609-b68ab3054191?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 504, name: 'Shahi Paneer', category: 'Supreme Range', price: 250, description: 'Onion, Capsicum, Red Paprika Paneer, Shahi Paneer Gravy & Cheese', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80', available: true },
];

export const MenuProvider = ({ children }) => {
  const [totalTables, setTotalTables] = useState(() => {
    return Number(localStorage.getItem('totalTables')) || 40;
  });
  
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menuItems');
    return saved ? JSON.parse(saved) : initialPizzaMenu;
  });

  const [bookedTables, setBookedTables] = useState(() => {
    const saved = localStorage.getItem('bookedTables');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep track of the current user's session booked table
  const [bookedTable, setBookedTable] = useState(null);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('totalTables', totalTables.toString()); }, [totalTables]);
  useEffect(() => { localStorage.setItem('menuItems', JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem('bookedTables', JSON.stringify(bookedTables)); }, [bookedTables]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

  const updateTotalTables = (count) => {
    setTotalTables(count);
  };

  const bookTable = (tableNumber, userId) => {
    if (!bookedTables.includes(tableNumber)) {
      setBookedTables(prev => [...prev, tableNumber]);
    }
    setBookedTable(tableNumber);
  };

  const toggleItemAvailability = (itemId) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...orderDetails
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <MenuContext.Provider value={{ 
      totalTables, updateTotalTables, 
      menuItems, toggleItemAvailability,
      bookedTables, bookTable, bookedTable,
      orders, placeOrder 
    }}>
      {children}
    </MenuContext.Provider>
  );
};
