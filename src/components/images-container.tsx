
import { ImageCard } from "./image-card"
import { useWorkers } from "@/hooks/useWorkers"

export function ImageContainer() {

  const {workers , setWorkers , loading } = useWorkers()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
      {workers.map((worker) => (
        <ImageCard key={worker.id} {...worker} />
      ))}
    </div>
  )
}
