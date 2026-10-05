import { Header } from '@/components/layout/Header';
import { getUserGroups } from '@/lib/queries';
import { GruposClient } from './GruposClient';

export default async function GruposPage() {
  const groups = await getUserGroups();

  return (
    <div className="min-h-screen">
      <Header title="Grupos" />
      <GruposClient groups={groups} />
    </div>
  );
}
