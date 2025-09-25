// src/app/workers/page.tsx
import WorkersPageClient from "@/component/WorkerPageClient";

export const metadata = {
  title: "Workers | SolveEase",
  description:
    "Hire skilled workers for various services. Browse workers by service type and price.",
};

export default function WorkersPage() {
  return <WorkersPageClient />;
}
