import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel'; // Import the Carousel component
import '../CSS/HomePage.css';

function HomePage() {
  // Define the content for each slide
  const slides = [
    {
      heading: 'Welcome to Mechazone',
      description: 'Discover amazing products and services.',
      buttonText: 'Register/Login',
      buttonLink: '/signup',
    },
    {
      heading: 'Revolutionize Your Vehicle Experience',
      description: 'Discover a comprehensive solution for all your automotive needs.',
      buttonText: 'Learn More',
      buttonLink: '/about',
    },
    {
      heading: 'Join Mechazone Today',
      description: 'Sign up now and get started.',
      buttonText: 'Sign Up',
      buttonLink: '/signup',
    },
  ];

  return (
    <div className="home-container">
      <Carousel slides={slides} /> {/* Use the Carousel component */}
    </div>
  );
}

export default HomePage;
