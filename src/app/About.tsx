import React from "react";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Client",
    text: "SolveEase Workers made it so easy to find reliable help for my home renovation. The process was smooth and the workers were professional!",
    image: "/public/vercel.svg",
  },
  {
    name: "Priya Singh",
    role: "Worker",
    text: "I found great job opportunities and fair pay through SolveEase. The platform is transparent and supportive!",
    image: "/public/next.svg",
  },
  {
    name: "Rahul Verma",
    role: "Client",
    text: "The customer support is top-notch and the workers are skilled. Highly recommended!",
    image: "/public/globe.svg",
  },
];

export default function About() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 pb-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          About SolveEase Workers
        </h1>
        <section className="mb-10 max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-bold text-blue-600">SolveEase Workers</span>{" "}
            was founded in 2022 with a mission to connect skilled workers with
            people and businesses in need of reliable services. Our platform
            bridges the gap between opportunity and talent, ensuring fair pay,
            transparency, and trust for all.
          </p>
          <p className="text-base text-gray-600">
            We started as a small team passionate about empowering local workers
            and have grown into a trusted platform serving thousands of clients
            and workers across the region. Our commitment to quality, safety,
            and customer satisfaction drives everything we do.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100"
              >
                {/* image removed */}
                <p className="text-gray-700 italic mb-2">“{t.text}”</p>
                <div className="font-semibold text-blue-600">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-900">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            We believe in a world where everyone has access to opportunity and
            support. Whether you need a skilled worker or are looking for work,
            SolveEase Workers is here to help you succeed.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 rounded-xl p-4 shadow w-full md:w-1/2">
              <div className="font-bold text-blue-700 mb-1">10,000+</div>
              <div className="text-gray-600 text-sm">Jobs Completed</div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 rounded-xl p-4 shadow w-full md:w-1/2">
              <div className="font-bold text-pink-700 mb-1">5,000+</div>
              <div className="text-gray-600 text-sm">Happy Clients</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
