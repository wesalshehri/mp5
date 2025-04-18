import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongo'; // or use relative path: '../../lib/mongo'

type PageProps = {
  params: {
    alias: string;
  };
};

export default async function Page({ params }: PageProps) {
  const client = await clientPromise;
  const db = client.db(); // or db('your-db-name') if needed
  const entry = await db.collection('shorturls').findOne({ alias: params.alias });

  if (!entry) {
    return <div style={{ padding: '2rem' }}>Alias not found 😢</div>;
  }

  redirect(entry.url);
}
