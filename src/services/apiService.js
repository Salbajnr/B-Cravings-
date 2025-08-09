
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Mock API for development

// Mock data for Bauchi, Nigeria
const mockRestaurants = [
  {
    id: 1,
    name: "Mama's Kitchen",
    cuisine: "Nigerian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 200,
    image: "/glovoimages/7f883ec1cf82cee10668bff77ff6d5448bba9ede18c56d9d74afcd9c8a77.jpeg",
    location: "Bauchi Central",
    menu: [
      { id: 1, name: "Jollof Rice", price: 1500, category: "Main Course" },
      { id: 2, name: "Fried Rice", price: 1800, category: "Main Course" },
      { id: 3, name: "Pepper Soup", price: 1200, category: "Soup" }
    ]
  },
  {
    id: 2,
    name: "Suya Palace",
    cuisine: "Grilled",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 150,
    image: "/glovoimages/c9efcd63fa9333697bfeadd414184667f1056e0b0e82ba64c8feb6ea2b8a.jpeg",
    location: "Yelwa Road",
    menu: [
      { id: 1, name: "Beef Suya", price: 2000, category: "Grilled" },
      { id: 2, name: "Chicken Suya", price: 2500, category: "Grilled" },
      { id: 3, name: "Fish Suya", price: 3000, category: "Grilled" }
    ]
  }
];

export const fetchRestaurants = async (searchTerm = '', category = '') => {
  try {
    // For development, return mock data
    let filtered = mockRestaurants;
    
    if (searchTerm) {
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    return filtered;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return mockRestaurants;
  }
};

export const fetchRestaurantById = async (id) => {
  try {
    const restaurant = mockRestaurants.find(r => r.id === parseInt(id));
    return restaurant || mockRestaurants[0];
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return mockRestaurants[0];
  }
};

export const searchFood = async (query) => {
  try {
    const allItems = mockRestaurants.flatMap(restaurant => 
      restaurant.menu.map(item => ({
        ...item,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id
      }))
    );
    
    return allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching food:', error);
    return [];
  }
};
