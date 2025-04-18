
import { redirect } from 'next/navigation';
import clientPromise from '../../lib/mongo';

export default async function Page({
  params,
}: {
  params: { alias: string };
}) {
  const client = await clientPromise;
  const db = client.db('urlshortener'); // ← make sure this matches your DB name
  const entry = await db.collection('urls').findOne({ alias: params.alias });

  if (!entry) {
    return <div style={{ padding: '2rem' }}>Alias not found.</div>;
  }

  redirect(entry.url); // ← server-side redirect
}
