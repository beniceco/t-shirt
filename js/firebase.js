// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi19btvvwjOIB86e7IUrtHI8Z6j5Q1iHg",
  authDomain: "summer-tshirt-orders.firebaseapp.com",
  databaseURL: "https://summer-tshirt-orders-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "summer-tshirt-orders",
  storageBucket: "summer-tshirt-orders.firebasestorage.app",
  messagingSenderId: "586235682518",
  appId: "1:586235682518:web:fe4a5bbe4be29ebd23b377"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save order to Firestore
export async function saveOrder(orderData) {
  try {
    // Add to orders collection with order number as document ID
    await setDoc(doc(db, "orders", orderData.order_number), orderData);
    
    // Also add to daily orders collection
    const today = new Date().toISOString().split('T')[0];
    await setDoc(doc(db, "orders_by_date", today, "daily_orders", orderData.order_number), orderData);
    
    console.log("Order saved successfully!");
    return true;
  } catch (error) {
    console.error("Error saving order:", error);
    return false;
  }
}

// Function to generate random order number (if needed)
export function generateOrderNumber() {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${timestamp}-${random}`;
} 