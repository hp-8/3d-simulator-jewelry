import React from 'react';
import Header from '../components/header';
import ImageBanner from '../components/imageBanner';
import image1 from '../assets/bannerImg1.jpg'
import image2 from '../assets/bannerImg2.jpg'
import FeaturedProducts from '../components/featuredProducts';
import productData from '../products.json';
import SpecialOffer from '../components/specialOffer';
import FAQSection from '../components/faqSection';
import ReviewCard from '../components/reviewCard';
import Footer from '../components/footer';



const Homepage: React.FC = () => {

  const navigationLinks = [
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Open Simulator', href: '/simulator' },

  ];

  const handleSearchClick = () => {
    console.log("Search Clicked");
  };

  const faqs = [
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes, we offer free shipping on all orders within the continental United States.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all jewelry items. Items must be returned in their original condition.',
    },
    {
      question: 'Can I customize my jewelry?',
      answer: 'Yes, we offer customization options for many of our jewelry pieces. Please contact us for more information.',
    },
    {
      question: 'Are your diamonds conflict-free?',
      answer: 'Yes, we only source diamonds from reputable suppliers who adhere to ethical and sustainable practices.',
    },
    {
      question: 'Do you offer financing options?',
      answer: 'Yes, we offer financing options through our partners. Please inquire for more details.',
    },
  ];

  const review =[

    {
      id: '1',
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
      rating: 4,
    },
    {
      id: '2',
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
      rating: 2,
    },
    {
      id: '3',
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
      rating: 5,
    },
    {
      id: '4',
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
      rating: 3,
    },
    {
      id: '5',
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
      rating: 4,
    },
  ]
  ;  
  
  return (
    <div className="homepage"> 
      <Header navigationLinks={navigationLinks} onSearchClick={handleSearchClick} /> 
  
      <ImageBanner 
        image1={image1}
        image2={image2}
        catchyLine="Get your Jewel Today!"
        buttonText="Shop Now"
        buttonLink="/products"
      />

      <FeaturedProducts products={productData}/>
      
      <SpecialOffer title={'Limited Time Offer'} description={'Exclusive work of art by our artists.'}/>
      <FAQSection faqs={faqs}/>
      <ReviewCard reviews={review}/>
      <Footer/>
    </div>
  );
};

export default Homepage;
