import { useState, useMemo, useCallback } from 'react';

export default function ShoppingCartApp() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1, image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, quantity: 2, image: '⌚' },
    { id: 3, name: 'Laptop Stand', price: 49.99, quantity: 1, image: '💻' }
  ]);

  const availableProducts = [
    { id: 4, name: 'USB-C Cable', price: 12.99, image: '🔌' },
    { id: 5, name: 'Mouse Pad', price: 15.99, image: '🖱️' },
    { id: 6, name: 'Desk Lamp', price: 34.99, image: '💡' }
  ];

  const cartSummary = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return { totalItems, subtotal, tax, total };
  }, [cart]);

  const updateQuantity = useCallback((id, delta) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 30%, #466097ff 100%)',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '2rem',
      color: 'white'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '0.5rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: 0
    },
    subtitle: {
      fontSize: '1rem',
      opacity: 0.9
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '1.5rem'
    },
    card: {
      backgroundColor: 'rgba(87, 86, 86, 0.99)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      marginBottom: '1rem'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      margin: 0
    },
    clearButton: {
      background: 'none',
      border: 'none',
      color: '#dc2626',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '0.25rem 0.5rem'
    },
    emptyCart: {
      textAlign: 'center',
      padding: '3rem 0',
      color: '#9ca3af'
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },
    cartItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      marginBottom: '1rem',
      transition: 'box-shadow 0.2s'
    },
    itemImage: {
      fontSize: '2.5rem',
      flexShrink: 0
    },
    itemInfo: {
      flexGrow: 1,
      minWidth: 0
    },
    itemName: {
      fontWeight: '600',
      margin: '0 0 0.25rem 0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    itemPrice: {
      color: '#6366f1',
      fontWeight: '500',
      margin: 0
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      padding: '0.25rem'
    },
    quantityButton: {
      padding: '0.5rem',
      backgroundColor: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1.125rem',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s'
    },
    quantityButtonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    quantity: {
      width: '2rem',
      textAlign: 'center',
      fontWeight: '600'
    },
    itemTotal: {
      fontWeight: '600',
      minWidth: '80px',
      textAlign: 'right'
    },
    deleteButton: {
      padding: '0.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1.25rem',
      transition: 'background-color 0.2s'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem'
    },
    productCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      textAlign: 'center',
      transition: 'border-color 0.2s'
    },
    productImage: {
      fontSize: '2.5rem',
      marginBottom: '0.5rem'
    },
    productName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      margin: '0 0 0.25rem 0'
    },
    productPrice: {
      color: '#6366f1',
      fontWeight: '600',
      marginBottom: '0.75rem'
    },
    addButton: {
      width: '100%',
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    summaryCard: {
      backgroundColor: 'rgba(97, 95, 95, 0.99)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      position: 'sticky',
      top: '2rem'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
      color: '#6b7280'
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '0.75rem',
      borderTop: '1px solid #e5e7eb',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      marginBottom: '1.5rem'
    },
    checkoutButton: {
      width: '100%',
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.875rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    checkoutButtonDisabled: {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed'
    },
    secureText: {
      fontSize: '0.75rem',
      color: '#9ca3af',
      textAlign: 'center',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>
            <span style={{ fontSize: '2.5rem' }}>🛒</span>
            <h1 style={styles.title}>Shopping Cart</h1>
          </div>
          <p style={styles.subtitle}>Manage your items and checkout</p>
        </header>

        <div style={styles.gridContainer}>
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  Cart Items ({cartSummary.totalItems})
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    style={styles.clearButton}
                    aria-label="Clear all items from cart"
                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              <div role="status" aria-live="polite" style={{ position: 'absolute', left: '-9999px' }}>
                Cart contains {cartSummary.totalItems} items
              </div>

              {cart.length === 0 ? (
                <div style={styles.emptyCart}>
                  <div style={styles.emptyIcon}>📦</div>
                  <p style={{ fontSize: '1.125rem', margin: '0 0 0.5rem 0' }}>Your cart is empty</p>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Add some products to get started</p>
                </div>
              ) : (
                <div>
                  {cart.map((item) => (
                    <article
                      key={item.id}
                      style={styles.cartItem}
                      onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                      onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <div style={styles.itemImage}>{item.image}</div>

                      <div style={styles.itemInfo}>
                        <h3 style={styles.itemName}>{item.name}</h3>
                        <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                      </div>

                      <div style={styles.quantityControl}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          style={{
                            ...styles.quantityButton,
                            ...(item.quantity <= 1 ? styles.quantityButtonDisabled : {})
                          }}
                          aria-label={`Decrease quantity of ${item.name}`}
                          onMouseOver={(e) => {
                            if (item.quantity > 1) e.target.style.backgroundColor = '#f9fafb';
                          }}
                          onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          −
                        </button>

                        <span style={styles.quantity} aria-label={`Quantity: ${item.quantity}`}>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={styles.quantityButton}
                          aria-label={`Increase quantity of ${item.name}`}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                          onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                        >
                          +
                        </button>
                      </div>

                      <div style={styles.itemTotal}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        style={styles.deleteButton}
                        aria-label={`Remove ${item.name} from cart`}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#fee2e2'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        🗑️
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div style={styles.card}>
              <h2 style={{ ...styles.cardTitle, marginBottom: '1rem' }}>
                Available Products
              </h2>
              <div style={styles.productsGrid}>
                {availableProducts.map((product) => (
                  <div
                    key={product.id}
                    style={styles.productCard}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#c7d2fe'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                  >
                    <div style={styles.productImage}>{product.image}</div>
                    <h3 style={styles.productName}>{product.name}</h3>
                    <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(product)}
                      style={styles.addButton}
                      aria-label={`Add ${product.name} to cart`}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={styles.summaryCard}>
              <h2 style={{ ...styles.cardTitle, marginBottom: '1rem' }}>
                Order Summary
              </h2>

              <div>
                <div style={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${cartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Tax (8%):</span>
                  <span>${cartSummary.tax.toFixed(2)}</span>
                </div>
                <div style={styles.summaryTotal}>
                  <span>Total:</span>
                  <span>${cartSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                style={{
                  ...styles.checkoutButton,
                  ...(cart.length === 0 ? styles.checkoutButtonDisabled : {})
                }}
                aria-label="Proceed to checkout"
                onMouseOver={(e) => {
                  if (cart.length > 0) e.target.style.backgroundColor = '#4f46e5';
                }}
                onMouseOut={(e) => {
                  if (cart.length > 0) e.target.style.backgroundColor = '#6366f1';
                }}
              >
                Checkout
              </button>

              <p style={styles.secureText}>
                Secure checkout with encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
