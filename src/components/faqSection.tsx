// FAQSection.tsx
import React, { useState } from 'react';
import '../styles/faqSection.css'

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-section">
        <h1>FAQS</h1>
      {faqs.map((faq, index) => (
        <div className={`faq-question ${openIndex === index ? 'active' : ''}`} key={index} onClick={() => toggleAccordion(index)}>
          <h3>{faq.question}</h3>
          <p className="faq-answer">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
