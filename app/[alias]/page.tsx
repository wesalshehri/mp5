import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongo';

export default async function Page({ params }: { params: { alias: string } }) {
  const client = await clientPromise;
  const db = client.db(); // uses default db from URI
  const result = await db.collection('shorturls').findOne({ alias: params.alias });

  if (!result) {
    return <div>Alias not found.</div>;
  }

  redirect(result.url);
}
