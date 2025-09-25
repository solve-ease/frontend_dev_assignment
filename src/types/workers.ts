export interface WorkerType {
  id: number
  name: string
  service: string
  pricePerDay: number
  image: string
}

export interface FilterState {
  service: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
}


export interface ApiResponse {
  success: boolean;
  data?: WorkerType[];
  error?: string;
}
