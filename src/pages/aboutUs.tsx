import '../styles/aboutUs.css';
import Header from '../components/header';




const AboutUs = () => {

  const navigationLinks = [
    { label: 'Home', href: '/' }
  ];
  
  return (
    
      <div className="container"> 
      <Header navigationLinks={navigationLinks} /> 
        <h1>About Garv Jewels</h1> {/* Adjust brand name here */}
        <div className="about-content">
            <div className="image-section">
                {/* A placeholder image - replace with your own */}
                <img src="https://images.unsplash.com/photo-1628058405911-c11ef68d9516?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amV3ZWxsZXJ8ZW58MHx8MHx8fDI%3D" alt="Garv Jewels Workshop" />
            </div>
            <div className="text-section">
                <h2>Our Story</h2>
                <p>Garv Jewels began with a passion for handcrafted beauty and a desire to create pieces that evoke both elegance and personal meaning. Inspired by (e.g., traditional Indian craftsmanship, the sparkle of gemstones, minimalist modern design),  we bring you a unique collection to be treasured.</p>

                <h2>Our Values</h2>
                <p>We believe in jewelry that’s more than just an accessory. We are committed to:
                  <ul>
                    <li>Ethical sourcing of materials</li>
                    <li>Meticulous craftsmanship</li>
                    <li>Designs that reflect your individual style</li>
                  </ul>
                </p>

                <h2>Meet the Artisan</h2> {/* Optional section for a solo creator */}
                <p>Garv, founder and head jeweler, has honed his skills over (mention years of experience). His passion shines through in each intricate detail and the timeless quality of his work.</p>
            </div>
            <div className="contact-details">
          <h2>Contact Us</h2>
          <p>
            <span>Address:</span> 123 Main Street, Jaipur, Rajasthan (India) 
            {/* Replace with your fake address */}
          </p>
          <p>
            <span>Phone: </span> +91 1234 567 890 
            {/* Replace with your fake phone number */}
          </p>
        </div>
        </div>   
      </div>
  
  );
};

export default AboutUs;
