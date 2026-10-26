import { LOCATIONS, getLocationIndex } from '@/data/locations';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationDetail from './location-detail';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = LOCATIONS[getLocationIndex(slug)];
  return location ? { title: location.name, description: location.subtitle } : {};
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const index = getLocationIndex(slug);
  if (index < 0) notFound();

  return <LocationDetail index={index} />;
}
