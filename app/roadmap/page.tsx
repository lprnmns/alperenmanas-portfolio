import type { Metadata } from 'next';

import RoadmapHiringView from '@/components/roadmap/RoadmapHiringView';

export const metadata: Metadata = {
  title: 'Roadmap - Alperen Manas',
  description: 'Plan and execution roadmap with curriculum tracking, timeline, artifacts, and weekly deep dive.',
};

export default function RoadmapPage() {
  return (
    <RoadmapHiringView />
  );
}
