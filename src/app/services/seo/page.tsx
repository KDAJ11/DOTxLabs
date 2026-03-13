import { getServicePage } from "@/lib/service-pages-data";
import ServicePageClient from "@/components/ServicePageClient";
import { notFound } from "next/navigation";

export default function SEOPage() {
  const data = getServicePage("seo");
  if (!data) notFound();
  return <ServicePageClient data={data} />;
}
