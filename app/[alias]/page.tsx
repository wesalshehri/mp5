import { redirect } from 'next/navigation';
import clientPromise from '../../lib/mongo'; 

export default async function Page({
  params,
}: {
  params: { alias: string };
}) {
  const client = await clientPromise;
  const db = client.db();
  const entry = await db.collection('shorturls').findOne({ alias: params.alias });

  if (!entry) {
    return <div style={{ padding: '2rem' }}>Alias not found</div>;
  }

  redirect(entry.url);
}
