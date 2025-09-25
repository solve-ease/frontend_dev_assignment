"use client";
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 pb-16">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          Contact Us
        </h1>
        <section className="mb-10 text-center">
          <p className="text-lg text-gray-700 mb-2">
            We'd love to hear from you! Whether you have a question, feedback,
            or need support, our team is here to help.
          </p>
          <p className="text-base text-gray-600">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </section>
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {submitted ? (
            <div className="text-center text-green-600 font-semibold text-lg py-8">
              Thank you for reaching out! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900 bg-blue-50"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900 bg-blue-50"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900 bg-blue-50"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 text-white font-semibold text-lg shadow hover:brightness-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Send Message
              </button>
            </form>
          )}
        </section>
        <section className="mt-10 text-center text-gray-500 text-sm">
          <div>
            Email:{" "}
            <a
              href="mailto:support@solveease.com"
              className="text-blue-600 hover:underline"
            >
              support@solveease.com
            </a>
          </div>
          <div>
            Phone:{" "}
            <a
              href="tel:+911234567890"
              className="text-blue-600 hover:underline"
            >
              +91 12345 67890
            </a>
          </div>
          <div className="mt-2">
            SolveEase Workers, 123 Main Street, New Delhi, India
          </div>
        </section>
      </div>
    </main>
  );
}
