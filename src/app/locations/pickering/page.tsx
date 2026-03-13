import { getLocationPage } from "@/lib/location-pages-data";
import LocationPageClient from "@/components/LocationPageClient";
import { notFound } from "next/navigation";

export default function PickeringPage() {
  const data = getLocationPage("pickering");
  if (!data) notFound();
  return <LocationPageClient data={data} />;
}
