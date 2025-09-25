import { WorkerType } from "@/types/workers";
import workersData from "../../workers.json";

export const getWorkers = (): WorkerType[] => {
  return workersData as WorkerType[];
};

export const getServices = (): string[] => {
  return Array.from(
    new Set(workersData.map((worker: WorkerType) => worker.service))
  ).sort();
};
