
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Enhanced mock data for Bauchi, Nigeria
const mockRestaurants = [
  {
    id: 1,
    name: "Mama's Kitchen",
    cuisine: "Nigerian",
    rating: 4.5,
    totalRatings: 156,
    deliveryTime: "25-35 min",
    deliveryFee: "₦200",
    image: "/bcravings-images/7f883ec1cf82cee10668bff77ff6d5448bba9ede18c56d9d74afcd9c8a77.jpeg",
    location: "Bauchi Central",
    description: "Authentic Nigerian cuisine with traditional flavors",
    isOpen: true
  },
  {
    id: 2,
    name: "Suya Palace",
    cuisine: "Grilled",
    rating: 4.7,
    totalRatings: 203,
    deliveryTime: "20-30 min",
    deliveryFee: "₦150",
    image: "/bcravings-images/c9efcd63fa9333697bfeadd414184667f1056e0b0e82ba64c8feb6ea2b8a.jpeg",
    location: "Yelwa Road",
    description: "Best grilled meats and suya in Bauchi",
    isOpen: true
  },
  {
    id: 3,
    name: "Bauchi Delights",
    cuisine: "Local",
    rating: 4.3,
    totalRatings: 89,
    deliveryTime: "30-40 min",
    deliveryFee: "₦250",
    image: "/bcravings-images/3941fe88ea36c1123ad291c21f32afe6a8794e893cea62a6f588458643bd.jpeg",
    location: "Dass Road",
    description: "Traditional Hausa and Nigerian delicacies",
    isOpen: true
  },
  {
    id: 4,
    name: "Fast Bites",
    cuisine: "Fast food",
    rating: 4.1,
    totalRatings: 124,
    deliveryTime: "15-25 min",
    deliveryFee: "₦100",
    image: "/bcravings-images/1c9d6cf772853d23d56fdc1265ea60c7aa89b46b668b023a834ba00e886d.jpeg",
    location: "GRA",
    description: "Quick bites and fast food favorites",
    isOpen: true
  },
  {
    id: 5,
    name: "Pizza Corner",
    cuisine: "Pizza",
    rating: 4.4,
    totalRatings: 98,
    deliveryTime: "30-40 min",
    deliveryFee: "₦300",
    image: "/bcravings-images/20a50a07b9ccab420354c8515f43858f27a4cb87419e2e66e9c7ab71a244.jpeg",
    location: "Market Road",
    description: "Authentic wood-fired pizzas",
    isOpen: true
  }
];

const mockMenuItems = {
  1: [
    { 
      id: 1, 
      name: "Jollof Rice", 
      price: 1500, 
      category: "Main Course", 
      description: "Delicious Nigerian jollof rice with vegetables",
      image: "/bcravings-images/1c9d6cf772853d23d56fdc1265ea60c7aa89b46b668b023a834ba00e886d.jpeg"
    },
    { 
      id: 2, 
      name: "Fried Rice", 
      price: 1800, 
      category: "Main Course", 
      description: "Tasty fried rice with mixed vegetables and chicken",
      image: "/bcravings-images/20a50a07b9ccab420354c8515f43858f27a4cb87419e2e66e9c7ab71a244.jpeg"
    },
    { 
      id: 3, 
      name: "Pepper Soup", 
      price: 1200, 
      category: "Soup", 
      description: "Spicy Nigerian pepper soup with fish or meat",
      image: "/bcravings-images/301efc23367198c0d3ec0f5b4c50114fa37870b58454591d6b3c04160835.jpeg"
    },
    { 
      id: 4, 
      name: "Pounded Yam & Egusi", 
      price: 2000, 
      category: "Main Course", 
      description: "Traditional pounded yam with egusi soup",
      image: "/bcravings-images/d54e69fdf14df41b5c1401a0952009bb3994e19e8473f89cc56d59d5227c.jpeg"
    }
  ],
  2: [
    { 
      id: 5, 
      name: "Beef Suya", 
      price: 2000, 
      category: "Grilled", 
      description: "Grilled beef with traditional spices and pepper",
      image: "/bcravings-images/f7bf589b518339b07968efbaa46ab47bc412e9577e313b107d95da58d8c0.jpeg"
    },
    { 
      id: 6, 
      name: "Chicken Suya", 
      price: 2500, 
      category: "Grilled", 
      description: "Grilled chicken with aromatic spices",
      image: "/bcravings-images/c9efcd63fa9333697bfeadd414184667f1056e0b0e82ba64c8feb6ea2b8a.jpeg"
    },
    { 
      id: 7, 
      name: "Fish Suya", 
      price: 3000, 
      category: "Grilled", 
      description: "Fresh grilled fish with pepper and spices",
      image: "/bcravings-images/7f883ec1cf82cee10668bff77ff6d5448bba9ede18c56d9d74afcd9c8a77.jpeg"
    }
  ],
  3: [
    { 
      id: 8, 
      name: "Tuwo Shinkafa", 
      price: 1000, 
      category: "Local", 
      description: "Traditional rice meal with soup",
      image: "/bcravings-images/1c9d6cf772853d23d56fdc1265ea60c7aa89b46b668b023a834ba00e886d.jpeg"
    },
    { 
      id: 9, 
      name: "Miyan Kuka", 
      price: 1500, 
      category: "Soup", 
      description: "Traditional baobab leaf soup",
      image: "/bcravings-images/20a50a07b9ccab420354c8515f43858f27a4cb87419e2e66e9c7ab71a244.jpeg"
    }
  ],
  4: [
    { 
      id: 10, 
      name: "Burger & Fries", 
      price: 2200, 
      category: "Fast food", 
      description: "Juicy beef burger with crispy fries",
      image: "/bcravings-images/3941fe88ea36c1123ad291c21f32afe6a8794e893cea62a6f588458643bd.jpeg"
    },
    { 
      id: 11, 
      name: "Chicken Wings", 
      price: 1800, 
      category: "Fast food", 
      description: "Spicy chicken wings with sauce",
      image: "/bcravings-images/c9efcd63fa9333697bfeadd414184667f1056e0b0e82ba64c8feb6ea2b8a.jpeg"
    }
  ],
  5: [
    { 
      id: 12, 
      name: "Margherita Pizza", 
      price: 3500, 
      category: "Pizza", 
      description: "Classic pizza with tomato, mozzarella, and basil",
      image: "/bcravings-images/20a50a07b9ccab420354c8515f43858f27a4cb87419e2e66e9c7ab71a244.jpeg"
    },
    { 
      id: 13, 
      name: "Pepperoni Pizza", 
      price: 4000, 
      category: "Pizza", 
      description: "Pizza topped with pepperoni and cheese",
      image: "/bcravings-images/1c9d6cf772853d23d56fdc1265ea60c7aa89b46b668b023a834ba00e886d.jpeg"
    }
  ]
};

export const restaurantService = {
  getRestaurants: async (searchQuery = '', category = '') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      let filtered = [...mockRestaurants];

      if (searchQuery.trim()) {
        filtered = filtered.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (category && category !== 'All') {
        filtered = filtered.filter(restaurant => 
          restaurant.cuisine.toLowerCase() === category.toLowerCase()
        );
      }

      return filtered;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return mockRestaurants;
    }
  },

  getRestaurantById: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const restaurant = mockRestaurants.find(r => r.id === parseInt(id));
      return restaurant || mockRestaurants[0];
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      return mockRestaurants[0];
    }
  },

  getRestaurantMenu: async (restaurantId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockMenuItems[restaurantId] || [];
    } catch (error) {
      console.error('Error fetching menu:', error);
      return [];
    }
  },

  searchRestaurants: async (query) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching restaurants:', error);
      return mockRestaurants;
    }
  }
};

export const orderService = {
  createOrder: async (orderData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const orderId = `BCR${Date.now()}`;
      return {
        id: orderId,
        ...orderData,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 35 * 60000).toISOString(),
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  trackOrder: async (orderId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const orderTime = parseInt(orderId.replace('BCR', ''));
      const timeDiff = Date.now() - orderTime;
      const minutesElapsed = Math.floor(timeDiff / 60000);
      
      let status = 'confirmed';
      if (minutesElapsed > 5) status = 'preparing';
      if (minutesElapsed > 15) status = 'on-route';
      if (minutesElapsed > 30) status = 'delivered';
      
      return {
        id: orderId,
        status: status,
        estimatedDelivery: new Date(Date.now() + Math.max(0, 35 - minutesElapsed) * 60000).toISOString(),
        total: 3500,
        createdAt: new Date(orderTime).toISOString()
      };
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  }
};

// Legacy function for backward compatibility
export const fetchRestaurants = async (searchQuery = '', category = '') => {
  return await restaurantService.getRestaurants(searchQuery, category);
};

export default { restaurantService, orderService };
