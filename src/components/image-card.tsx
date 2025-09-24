import Image from "next/image"
import { WorkerType } from "@/types/workers"

export function ImageCard({ id, name, service, image, pricePerDay }: WorkerType) {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-md  hover:shadow-lg transition-shadow duration-300 p-2 bg-white">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{service}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-teal-600 font-medium">₹{pricePerDay}/day</span>
          <button className="px-6 py-1 text-[15px] rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer">
            Hire
          </button>
        </div>
      </div>
    </div>
  )
}
