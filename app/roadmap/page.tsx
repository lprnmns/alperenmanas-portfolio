import type { Metadata } from 'next';

import RoadmapHiringView from '@/components/roadmap/RoadmapHiringView';

export const metadata: Metadata = {
  title: 'Roadmap - Alperen Manas',
  description: 'Interactive roadmap with hiring view, timeline, artifacts, and weekly deep dive.',
};

export default function RoadmapPage() {
  return (
    <RoadmapHiringView />
  );
}
