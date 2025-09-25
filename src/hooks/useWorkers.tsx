"use client"
import { useState, useEffect } from "react"
import { WorkerType } from "@/types/workers"

export function useWorkers() {

  const [workers, setWorkers] = useState<WorkerType[] | []>([])
  const [loading, setLoading] = useState<true | false>(false);

  const fetchWorkers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/workers')
      const data = await response.json();
      setWorkers(data.data)
    } catch (e) {
      console.log(e)
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkers()
  }, [])


  return { workers, setWorkers, loading, setLoading }
}