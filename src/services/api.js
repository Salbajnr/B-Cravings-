
const BASE_URL = 'https://jsonplaceholder.typicode.com'; // Mock API for demo
const FOOD_API = 'https://www.themealdb.com/api/json/v1/1'; // Real food API

// Restaurant data service
export const restaurantService = {
  async getRestaurants() {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const posts = await response.json();
      
      // Transform posts into restaurant data
      return posts.slice(0, 10).map(post => ({
        id: post.id,
        name: `Restaurant ${post.id}`,
        cuisine: ['Italian', 'Chinese', 'Mexican', 'Indian', 'American'][Math.floor(Math.random() * 5)],
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        deliveryTime: `${20 + Math.floor(Math.random() * 30)} min`,
        image: `https://picsum.photos/300/200?random=${post.id}`,
        description: post.body.substring(0, 100) + '...',
        isOpen: Math.random() > 0.2
      }));
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  },

  async getRestaurantMenu(restaurantId) {
    try {
      const response = await fetch(`${FOOD_API}/search.php?s=chicken`);
      const data = await response.json();
      
      return data.meals?.slice(0, 8).map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        description: meal.strInstructions.substring(0, 100) + '...',
        price: (8.99 + Math.random() * 15).toFixed(2),
        image: meal.strMealThumb,
        category: meal.strCategory
      })) || [];
    } catch (error) {
      console.error('Error fetching menu:', error);
      return [];
    }
  }
};

// Order tracking service
export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const order = await response.json();
      
      return {
        id: order.id,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(),
        items: orderData.items,
        total: orderData.total
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async trackOrder(orderId) {
    const statuses = ['confirmed', 'preparing', 'on-route', 'delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: orderId,
      status: randomStatus,
      estimatedDelivery: new Date(Date.now() + 20 * 60000).toISOString(),
      driverLocation: {
        lat: -0.3476 + (Math.random() - 0.5) * 0.01,
        lng: 32.5825 + (Math.random() - 0.5) * 0.01
      }
    };
  }
};

// Search service
export const searchService = {
  async searchRestaurants(query) {
    try {
      const restaurants = await restaurantService.getRestaurants();
      return restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching restaurants:', error);
      return [];
    }
  }
};
