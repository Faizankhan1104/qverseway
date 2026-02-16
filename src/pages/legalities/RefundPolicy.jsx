// src/pages/RefundPolicy.jsx
import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy</h1>

      <p className="mb-4">
        Thank you for choosing <strong>QVerse Way</strong>. We value your trust
        and aim to provide a transparent and fair refund process. This policy
        applies to all courses, subscriptions, and services offered by QVerse Way.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Refund Eligibility</h2>
      <p>
        You may request a refund within <strong>7 days from the Activation Date</strong>{" "}
        of your purchased service or subscription. Approved refunds will be
        issued after deduction of applicable platform or processing fees.
      </p>
      <p className="mt-2">
        Any request made after 7 days from the Activation Date will not be
        eligible for a refund.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How to Request a Refund</h2>
      <p>To request a cancellation or refund, please contact us:</p>
      <p className="mt-2 font-medium">Email: support@qverseway.com</p>
      <ul className="list-disc ml-6 mt-2">
        <li>Registered mobile number</li>
        <li>Order ID / Payment reference</li>
        <li>Reason for cancellation</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Refund Processing</h2>
      <ul className="list-disc ml-6">
        <li>Refunds issued to original payment method</li>
        <li>Processed in Indian Rupees (INR)</li>
        <li>May take up to 14 working days after approval</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Non-Refundable Situations</h2>
      <ul className="list-disc ml-6">
        <li>Request submitted after 7-day window</li>
        <li>Account suspended for Terms violation</li>
        <li>Significant portion of course already used</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Force Majeure</h2>
      <p>
        If QVerse Way cannot continue services due to events beyond reasonable
        control (government restrictions, technical failures, natural disasters),
        refunds will not be issued for the portion already delivered.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Policy Updates</h2>
      <p>
        QVerse Way reserves the right to modify this policy at any time without
        prior notice. Continued use of services constitutes acceptance of the
        updated policy.
      </p>
    </div>
  );
};

export default RefundPolicy;
