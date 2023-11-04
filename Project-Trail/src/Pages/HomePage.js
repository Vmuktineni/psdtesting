import React from 'react';
import Carousel from '../components/Carousel'; // Import the Carousel component
import '../CSS/HomePage.css';

function HomePage() {

  const slides = [
    {
      heading: 'Welcome to Mechazone',
      description: 'Discover amazing products and services.',
      buttonText: 'Register/Login',
      buttonLink: '/signup',
      background: 'url(image1.avif)', 

    },
    {
      heading: 'Revolutionize Your Vehicle Experience',
      description: 'Discover a comprehensive solution for all your automotive needs.',
      buttonText: 'Learn More',
      buttonLink: '/about',
      background: 'url(image2.webp)', 

    },
    {
      heading: 'Join Mechazone Today',
      description: 'Sign up now and get started.',
      buttonText: 'Sign Up',
      buttonLink: '/signup',
      background: 'url(image3.webp)', 

    },
  ];

  return (
    <div className="home-container">
      <Carousel slides={slides} /> 
    </div>
  );
}


export default HomePage;


