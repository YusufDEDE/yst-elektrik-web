import { ContactPage } from "@/components/pages/contact-page";
import type { Metadata } from "next";

/** Prod uses static `Contact | YST Elektrik` for all locales. */
export const metadata: Metadata = {
  title: "Contact | YST Elektrik",
};

export default function ContactRoute() {
  return <ContactPage />;
}
