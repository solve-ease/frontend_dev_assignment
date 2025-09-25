"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { WorkerType } from "@/types/workers";

const WorkerCard = React.memo(function WorkerCard({
  worker,
}: {
  worker: WorkerType,
}) {
  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={worker.image}
          alt={`${worker.name} - ${worker.service}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow">
          {worker.service}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition">
          {worker.name}
        </h3>
        <p className="text-sm text-gray-500">{worker.service}</p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-bold text-indigo-600 text-lg"
        >
          ₹{Math.round(worker.pricePerDay * 1.18)} / day
        </motion.p>
      </div>
    </motion.article>
  );
});

WorkerCard.displayName = "WorkerCard";
export default WorkerCard;
