// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXoL55fWEJHYEYBgNxcKYKB9Tr2bNkAFk",
  authDomain: "summer-tshirt-orders.firebaseapp.com",
  databaseURL: "https://summer-tshirt-orders-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "summer-tshirt-orders",
  storageBucket: "summer-tshirt-orders.appspot.com",
  messagingSenderId: "1007990647992",
  appId: "1:1007990647992:web:13a7c3f70dd84d88ad139b",
  measurementId: "G-4GL1ZK2JE4"
};

// Initialize Firebase
let app, db, auth, analytics;

function initFirebase() {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
      
      // Initialize Firebase services
      db = firebase.firestore();
      auth = firebase.auth();
      
      // Initialize Analytics if available
      if (firebase.analytics) {
        analytics = firebase.analytics();
      }

      console.log('Firebase initialized successfully');
    } else {
      app = firebase.app();
      db = firebase.firestore();
      auth = firebase.auth();
      
      if (firebase.analytics) {
        analytics = firebase.analytics();
      }
    }
    return true;
  } else {
    console.error('Firebase SDK not found. Make sure to include Firebase libraries in HTML.');
    return false;
  }
}

// Function to save order to Firestore
async function saveOrder(orderData) {
  if (!db) {
    if (!initFirebase()) return false;
  }
  
  try {
    // Add timestamp to order data
    orderData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    
    // Add to orders collection with order number as document ID
    await db.collection("orders").doc(orderData.order_number).set(orderData);
    
    // Also add to daily orders collection for date-based queries
    const today = new Date().toISOString().split('T')[0];
    await db.collection("orders_by_date").doc(today).collection("daily_orders").doc(orderData.order_number).set(orderData);
    
    // Log event in Analytics if available
    if (analytics) {
      analytics.logEvent('purchase', {
        value: parseFloat(orderData.total_price.replace(/[^\d.]/g, '')),
        currency: 'EGP',
        items: JSON.parse(orderData.product_details)
      });
    }
    
    console.log("Order saved successfully!");
    return true;
  } catch (error) {
    console.error("Error saving order:", error);
    return false;
  }
}

// Function to save lead to Firestore
async function saveLead(leadData) {
  if (!db) {
    if (!initFirebase()) return false;
  }
  
  try {
    // Add timestamp to lead data
    leadData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    
    // Generate a unique ID for this lead
    const leadRef = await db.collection("leads").add(leadData);
    
    // Log event in Analytics if available
    if (analytics) {
      analytics.logEvent('generate_lead', {
        source: leadData.source || 'website'
      });
    }
    
    console.log("Lead saved successfully with ID:", leadRef.id);
    return true;
  } catch (error) {
    console.error("Error saving lead:", error);
    return false;
  }
}

// Function to save contact form submission
async function saveContactForm(contactData) {
  if (!db) {
    if (!initFirebase()) return false;
  }
  
  try {
    // Add timestamp to contact data
    contactData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    
    // Save to contact_submissions collection
    const contactRef = await db.collection("contact_submissions").add(contactData);
    
    console.log("Contact form submitted successfully with ID:", contactRef.id);
    return true;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return false;
  }
}

// Function to generate random order number
function generateOrderNumber() {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${timestamp}-${random}`;
}

// Function to sync orders that were saved locally while offline
async function syncPendingOrders() {
  if (!db) {
    if (!initFirebase()) return false;
  }
  
  try {
    const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
    if (pendingOrders.length === 0) {
      console.log("No pending orders to sync");
      return true;
    }
    
    console.log(`Found ${pendingOrders.length} pending orders to sync`);
    
    // Process each pending order
    const promises = pendingOrders.map(async (orderData) => {
      try {
        // Add to orders collection
        await db.collection("orders").doc(orderData.order_number).set(orderData);
        
        // Add to daily orders collection
        const orderDate = new Date(orderData.order_date);
        const dateString = orderDate.toISOString().split('T')[0];
        await db.collection("orders_by_date").doc(dateString).collection("daily_orders").doc(orderData.order_number).set(orderData);
        
        console.log(`Synced pending order: ${orderData.order_number}`);
        return true;
      } catch (error) {
        console.error(`Error syncing order ${orderData.order_number}:`, error);
        return false;
      }
    });
    
    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    
    // If all orders were synced successfully, clear the pending orders
    if (results.every(result => result === true)) {
      localStorage.removeItem('pendingOrders');
      console.log("All pending orders synced successfully");
      return true;
    } else {
      // Update the pending orders to only include those that failed to sync
      const failedOrders = pendingOrders.filter((_, index) => !results[index]);
      localStorage.setItem('pendingOrders', JSON.stringify(failedOrders));
      console.log(`${failedOrders.length} orders failed to sync and will be retried later`);
      return false;
    }
  } catch (error) {
    console.error("Error syncing pending orders:", error);
    return false;
  }
}

// Initialize Firebase when this script loads
initFirebase();

// Export functions for use in other scripts
window.firebaseServices = {
  saveOrder,
  saveLead,
  saveContactForm,
  generateOrderNumber,
  syncPendingOrders,
  db,
  auth,
  analytics
}; 