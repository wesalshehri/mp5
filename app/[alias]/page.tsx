import { redirect } from 'next/navigation';
import clientPromise from '../../lib/mongo'; // Adjust the path as necessary

type Props = {
  params: Promise<{ alias: string }>;
};

export default async function Page({ params }: Props) {
  const { alias } = await params;

  const client = await clientPromise;
  const db = client.db();
  const entry = await db.collection('shorturls').findOne({ alias });

  if (!entry) {
    return <div style={{ padding: '2rem' }}>Alias not found 😢</div>;
  }

  redirect(entry.url);
}
