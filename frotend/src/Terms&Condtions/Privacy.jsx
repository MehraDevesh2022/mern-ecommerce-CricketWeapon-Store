import React from "react";
import {Link} from "react-router-dom";
import "./Privacy.css";
import MetaData from "../component/layouts/MataData/MataData";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
     <MetaData title={"Privacy Policy"} />
      <div className="container___">
        <h1>Privacy Policy of CricketWeapon</h1>
        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          {" "}
          Effective Date: 23-12-2021
        </p>
        <p>
          At CricketWeapon, we value the privacy of our customers and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you use our website and services. Please read this Privacy Policy
          carefully. By accessing or using our website and services, you
          acknowledge that you have read, understood, and agree to be bound by
          all the terms outlined in this Privacy Policy.
        </p>
        <h2>1. Information We Collect</h2>
        <h3>1.1 Personal Information:</h3>
        <p>
          We may collect personal information that you voluntarily provide to us
          when you register an account, place an order, subscribe to our
          newsletter, participate in contests or surveys, or contact us for
          support. This information may include your name, email address, phone
          number, shipping address, billing address, and payment details.
        </p>
        <h3>1.2 Non-Personal Information:</h3>
        <p>
          When you interact with our website, we may collect non-personal
          information about your device, browsing actions, and usage patterns.
          This information may include your IP address, browser type, operating
          system, referring URLs, and interactions with our website.
        </p>
        <h2>2. Use of Information</h2>
        <h3>2.1 Personal Information:</h3>
        <p>We may use the personal information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Provide customer support and respond to inquiries</li>
          <li>
            Send you promotional offers, newsletters, and marketing
            communications (you can opt-out at any time)
          </li>
          <li>Improve our website, products, and services</li>
          <li>Personalize your experience on our website</li>
          <li>
            Prevent fraudulent activities and ensure the security of our
            platform
          </li>
        </ul>
        <h3>2.2 Non-Personal Information:</h3>
        <p>
          We may use non-personal information for various purposes, including:
        </p>
        <ul>
          <li>Analyzing trends and user behavior</li>
          <li>Monitoring and improving the functionality of our website</li>
          <li>Customizing content and advertisements</li>
          <li>Generating aggregated statistical data</li>
        </ul>
        <h2>3. Disclosure of Information</h2>
        <p>
          We may disclose your information to third parties in the following
          circumstances:
        </p>
        <ul>
          <li>
            To our trusted service providers who assist us in operating our
            business and providing services to you
          </li>
          <li>
            To comply with legal obligations, enforce our policies, or respond
            to legal requests
          </li>
          <li>
            In the event of a merger, acquisition, or sale of all or a portion
            of our business assets
          </li>
          <li>With your consent or at your direction</li>
        </ul>
        <h2>4. Security</h2>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access, disclosure, alteration, or destruction. However,
          please note that no method of transmission over the internet or
          electronic storage is completely secure, and we cannot guarantee
          absolute security.
        </p>
        <h2>5. Children's Privacy</h2>
        <p>
          Our website and services are not intended for children under the age
          of 13. We do not knowingly collect personal information from children.
          If we become aware that we have collected personal information from a
          child without parental consent, we will take steps to remove that
          information from our servers.
        </p>
        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Any changes will
          be posted on this page, and the revised Privacy Policy will take
          effect immediately upon posting. We encourage you to review this
          Privacy Policy periodically for any updates or changes.
        </p>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions, concerns, or suggestions regarding this
          Privacy Policy, please contact us at{" "}
          <Link to="/" style={{ textDecoration : "none" , color : "inherit" , fontWeight : 700}}>
            [insert contact information]
          </Link>
        </p>
        <p>
          By using the CricketWeapon website and services, you agree to the
          collection, use, and disclosure of your information as described in
          this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
