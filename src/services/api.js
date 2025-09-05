
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Mock data for Bauchi, Nigeria
const mockRestaurants = [
  {
    id: 1,
    name: "Mama's Kitchen",
    cuisine: "Nigerian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: "₦200",
    image: "/bcravings-images/7f883ec1cf82cee10668bff77ff6d5448bba9ede18c56d9d74afcd9c8a77.jpeg",
    location: "Bauchi Central",
    menu: [
      { id: 1, name: "Jollof Rice", price: 1500, category: "Main Course", description: "Delicious Nigerian jollof rice" },
      { id: 2, name: "Fried Rice", price: 1800, category: "Main Course", description: "Tasty fried rice with vegetables" },
      { id: 3, name: "Pepper Soup", price: 1200, category: "Soup", description: "Spicy Nigerian pepper soup" }
    ]
  },
  {
    id: 2,
    name: "Suya Palace",
    cuisine: "Grilled",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "₦150",
    image: "/bcravings-images/c9efcd63fa9333697bfeadd414184667f1056e0b0e82ba64c8feb6ea2b8a.jpeg",
    location: "Yelwa Road",
    menu: [
      { id: 1, name: "Beef Suya", price: 2000, category: "Grilled", description: "Grilled beef with spices" },
      { id: 2, name: "Chicken Suya", price: 2500, category: "Grilled", description: "Grilled chicken with spices" },
      { id: 3, name: "Fish Suya", price: 3000, category: "Grilled", description: "Grilled fish with spices" }
    ]
  }
];

export const restaurantService = {
  getAll: async () => {
    try {
      return mockRestaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return mockRestaurants;
    }
  },

  getById: async (id) => {
    try {
      const restaurant = mockRestaurants.find(r => r.id === parseInt(id));
      return restaurant || mockRestaurants[0];
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      return mockRestaurants[0];
    }
  },

  search: async (query) => {
    try {
      return mockRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching restaurants:', error);
      return mockRestaurants;
    }
  }
};

export const orderService = {
  create: async (orderData) => {
    try {
      const orderId = Date.now().toString();
      return {
        id: orderId,
        ...orderData,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString()
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  trackOrder: async (orderId) => {
    try {
      return {
        id: orderId,
        status: 'preparing',
        estimatedDelivery: new Date(Date.now() + 25 * 60000).toISOString(),
        driverLocation: { lat: 10.3158, lng: 9.8442 }
      };
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  }
};
