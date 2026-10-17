import { AboutPage } from "@/components/pages/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | YST Elektrik",
};

export default function AboutRoute() {
  return <AboutPage />;
}
