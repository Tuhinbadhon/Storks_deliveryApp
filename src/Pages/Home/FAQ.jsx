import React, { useState } from "react";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How can I track my parcel?",
      answer:
        "To track your parcel, you can use the tracking number provided to you at the time of shipment. Enter this tracking number on the delivery company’s website or app to see real-time updates on the status and location of your parcel.",
    },
    {
      question: "What should I do if my parcel is delayed?",
      answer:
        "If your parcel is delayed, first check the tracking information for updates. If there are no updates or the parcel is significantly delayed, contact the delivery company's customer service for assistance. They can provide more detailed information and help resolve any issues.",
    },
    {
      question: "How can I schedule a parcel pickup?",
      answer:
        "To schedule a parcel pickup, visit the delivery company's website or app and look for the 'Schedule a Pickup' option. Enter the required details such as pickup address, parcel details, and preferred pickup time. Confirm the booking and ensure your parcel is ready for the pickup at the scheduled time.",
    },
    {
      question: "What if my parcel is damaged upon delivery?",
      answer:
        "If your parcel is damaged upon delivery, document the damage by taking photos immediately. Contact the delivery company's customer service to report the damage. Provide them with the necessary details and photos to file a claim. They will guide you through the claims process and assist in resolving the issue.",
    },
    {
      question:
        "Can I change the delivery address after the parcel has been shipped?",
      answer:
        "Changing the delivery address after the parcel has been shipped can be challenging but is sometimes possible. Contact the delivery company’s customer service as soon as you realize the need to change the address. They will inform you if an address change is possible and any additional steps or fees involved.",
    },
    {
      question: "How can I ensure the security of my parcel during delivery?",
      answer:
        "To ensure the security of your parcel during delivery, use a reliable and reputable delivery service. Opt for services that offer tracking, insurance, and signature on delivery. Packaging your parcel securely with appropriate materials also helps protect it from damage or tampering. If possible, request delivery to a secure location where someone can receive it personally.",
    },
  ];

  return (
    <div>
      <section className="lg:mx-24 mx-5 mt-10">
        <div className="container flex flex-col items-center p-4 mx-auto md:p-8">
          <h1
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-lg mb-10 lg:text-3xl font-bold text-center"
          >
            Frequently Asked Questions
          </h1>
          <div className="" data-aos="fade-up" data-aos-duration="1000">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`collapse rounded-md collapse-plus cursor-pointer mb-2 bg-base-200 ${
                  expandedIndex === index ? "collapse-open" : ""
                }`}
              >
                <input
                  type="radio"
                  name="my-accordion-2"
                  checked={expandedIndex === index}
                  onChange={() => handleToggle(index)}
                  className="hidden"
                />
                <div
                  className="collapse-title text-xl font-medium"
                  onClick={() => handleToggle(index)}
                >
                  {item.question}
                </div>
                <div className="collapse-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
