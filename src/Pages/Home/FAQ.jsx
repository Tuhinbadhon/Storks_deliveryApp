import React from "react";

const FAQ = () => {
  return (
    <div>
      <section className=" lg:mx-24 mx-5 mt-10 ">
        <div className="container flex flex-col items-center p-4 mx-auto md:p-8">
          <h1
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-lg mb-10 lg:text-3xl font-bold text-center"
          >
            Frequently Asked Questions
          </h1>
          <div data-aos="fade-up" data-aos-duration="1000">
            <div className="collapse  collapse-arrow mb-2 bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                How can I track my{" "}
                <span className="text-orange-500">parcel</span>?
              </div>
              <div className="collapse-content">
                <p>
                  To track your parcel, you can use the tracking number provided
                  to you at the time of shipment. Enter this tracking number on
                  the delivery company’s website or app to see real-time updates
                  on the status and location of your parcel.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow  mb-2 bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                What should I do if my{" "}
                <span className="text-orange-500">parcel</span> is delayed?
              </div>
              <div className="collapse-content">
                <p>
                  If your parcel is delayed, first check the tracking
                  information for updates. If there are no updates or the parcel
                  is significantly delayed, contact the delivery company's
                  customer service for assistance. They can provide more
                  detailed information and help resolve any issues.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow mb-2  bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                How can I schedule a{" "}
                <span className="text-orange-500">parcel</span> pickup?
              </div>
              <div className="collapse-content">
                <p>
                  To schedule a parcel pickup, visit the delivery company's
                  website or app and look for the "Schedule a Pickup" option.
                  Enter the required details such as pickup address, parcel
                  details, and preferred pickup time. Confirm the booking and
                  ensure your parcel is ready for the pickup at the scheduled
                  time.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow mb-2  bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                What if my <span className="text-orange-500">parcel</span> is
                <span className="text-red-500"> damaged</span> upon delivery?
              </div>
              <div className="collapse-content">
                <p>
                  If your parcel is damaged upon delivery, document the damage
                  by taking photos immediately. Contact the delivery company's
                  customer service to report the damage. Provide them with the
                  necessary details and photos to file a claim. They will guide
                  you through the claims process and assist in resolving the
                  issue.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow mb-2  bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Can I change the delivery address after the{" "}
                <span className="text-orange-500">parcel</span> has been
                shipped?
              </div>
              <div className="collapse-content">
                <p>
                  Changing the delivery address after the parcel has been
                  shipped can be challenging but is sometimes possible. Contact
                  the delivery company’s customer service as soon as you realize
                  the need to change the address. They will inform you if an
                  address change is possible and any additional steps or fees
                  involved.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow mb-2  bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                How can I ensure the security of my{" "}
                <span className="text-orange-500">parcel</span> during delivery?
              </div>
              <div className="collapse-content">
                <p>
                  To ensure the security of your parcel during delivery, use a
                  reliable and reputable delivery service. Opt for services that
                  offer tracking, insurance, and signature on delivery.
                  Packaging your parcel securely with appropriate materials also
                  helps protect it from damage or tampering. If possible,
                  request delivery to a secure location where someone can
                  receive it personally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
