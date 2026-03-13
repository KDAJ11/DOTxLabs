import { getServicePage } from "@/lib/service-pages-data";
import ServicePageClient from "@/components/ServicePageClient";
import { notFound } from "next/navigation";

export default function WebDevelopmentPage() {
  const data = getServicePage("web-development");
  if (!data) notFound();
  return <ServicePageClient data={data} />;
}
