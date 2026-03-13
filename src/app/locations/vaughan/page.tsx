import { getLocationPage } from "@/lib/location-pages-data";
import LocationPageClient from "@/components/LocationPageClient";
import { notFound } from "next/navigation";

export default function VaughanPage() {
  const data = getLocationPage("vaughan");
  if (!data) notFound();
  return <LocationPageClient data={data} />;
}
