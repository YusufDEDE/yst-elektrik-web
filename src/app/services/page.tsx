import { notFound } from "next/navigation";

/** Prod: GET /services → 404 (birebir). */
export default function ServicesIndexPage() {
  notFound();
}
