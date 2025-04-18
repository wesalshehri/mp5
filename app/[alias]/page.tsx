import { redirect } from 'next/navigation';
import clientPromise from '../../lib/mongo'; 

type Props = {
  params: Promise<{ alias: string }>;
};

export default async function Page({ params }: Props) {
  const { alias } = await params;

  const client = await clientPromise;
  const db = client.db('urlshortener');
  const entry = await db.collection('urls').findOne({ alias });

  if (!entry) {
    return <div style={{ padding: '2rem' }}>Alias not found.</div>;
  }

  redirect(entry.url);
}
