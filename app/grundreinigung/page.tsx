'use client';
import { ServiceLandingPage } from '@/components/ServiceLandingPage';
import { SERVICES } from '@/lib/serviceLandingData';

export default function Page() {
  return <ServiceLandingPage data={SERVICES.grundreinigung} />;
}