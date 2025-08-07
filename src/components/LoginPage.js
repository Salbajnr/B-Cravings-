
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-container">
      <header>
        <Link to="/" className="logo">
          <h2>
            Glovo<span><img src="./glovoimages/32x32.png" alt="" /></span>
          </h2>
        </Link>
      </header>
      <main>
        <div className="login-form">
          <h1>Welcome to Glovo</h1>
          <p>Please sign in to continue</p>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
