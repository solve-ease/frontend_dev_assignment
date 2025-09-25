import { render, screen } from "@testing-library/react";
import WorkerCard from "../app/page"; // adjust import if WorkerCard is in a separate file

const worker = {
  id: 1,
  name: "John Doe",
  service: "Plumber",
  pricePerDay: 500,
  image: "/john.jpg",
};

describe("WorkerCard", () => {
  it("renders worker details", () => {
    render(<WorkerCard worker={worker} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Plumber")).toBeInTheDocument();
    expect(screen.getByText("₹500/day")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });
});