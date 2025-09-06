# B-Cravings

## Overview

B-Cravings is a food delivery web application designed specifically for Bauchi State, Nigeria. The platform connects local restaurants with customers through a modern React-based interface, enabling users to browse restaurants, view menus, place orders, and track deliveries. Built as part of an academic project by a 15-member development team, the application focuses on serving the Nigerian urban population with authentic local cuisine and familiar international options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18.2.0 with functional components and hooks
- **Routing**: React Router DOM for client-side navigation
- **State Management**: Context API with useReducer for global state management
- **Styling**: Custom CSS with mobile-first responsive design approach
- **Component Structure**: Modular component architecture with reusable UI elements

### Application Structure
- **Pages**: Home, Food listing, Restaurant details, Cart/Order summary, Checkout, Order tracking, Login
- **State Management**: Centralized cart state, user authentication state, and order management
- **Navigation**: Single-page application with React Router handling route transitions

### Data Architecture
- **Mock Data Strategy**: Uses JSONPlaceholder API as a development placeholder for restaurant data
- **Local Storage**: Persists user authentication data and cart state
- **State Schema**: Restaurants, menu items, cart items, user data, and order tracking information

### Authentication System
- **Basic Authentication**: Email/password login with client-side validation
- **Session Management**: localStorage-based user session persistence
- **User State**: Context-based authentication state management

### Payment Integration
- **Payment Gateway**: Designed for Paystack integration (Nigerian payment processor)
- **Multiple Payment Methods**: Card payments, mobile wallets, and cash on delivery options
- **Order Processing**: Multi-step checkout flow with address collection and payment confirmation

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18.2.0, React DOM, React Router DOM 6.8.0
- **HTTP Client**: Axios 1.3.0 for API communication
- **Build Tools**: React Scripts 5.0.1 for development and build processes

### UI Libraries
- **Icons**: Boxicons and Font Awesome for consistent iconography
- **Styling**: Custom CSS with modern design patterns and animations

### Mock APIs
- **Development API**: JSONPlaceholder (jsonplaceholder.typicode.com) for restaurant and menu data simulation
- **Image Assets**: Picsum Photos for placeholder restaurant images

### Planned Integrations
- **Payment Processing**: Paystack for Nigerian Naira transactions
- **Real-time Updates**: WebSocket connections for order tracking
- **Maps Integration**: Google Maps or similar for delivery tracking
- **Push Notifications**: Browser notifications for order updates

### Development Environment
- **Package Manager**: npm for dependency management
- **Code Editor**: Replit-based development environment
- **Version Control**: Git-based version control system

### Target Deployment
- **Static Hosting**: Optimized for deployment on platforms like Netlify or Vercel
- **API Backend**: Designed to integrate with Node.js/Express backend services
- **Database**: Architecture supports integration with PostgreSQL or MongoDB for production data storage