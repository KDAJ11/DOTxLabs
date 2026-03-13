import { getLocationPage } from "@/lib/location-pages-data";
import LocationPageClient from "@/components/LocationPageClient";
import { notFound } from "next/navigation";

export default function BowmanvillePage() {
  const data = getLocationPage("bowmanville");
  if (!data) notFound();
  return <LocationPageClient data={data} />;
}
