import { getServicePage } from "@/lib/service-pages-data";
import ServicePageClient from "@/components/ServicePageClient";
import { notFound } from "next/navigation";

export default function AIAutomationPage() {
  const data = getServicePage("ai-automation");
  if (!data) notFound();
  return <ServicePageClient data={data} />;
}
