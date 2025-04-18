import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongo';

export default async function Page({ params }: { params: { alias: string } }) {
  const client = await clientPromise;
  const db = client.db(); // defaults to DB name in URI
  const result = await db.collection('shorturls').findOne({ alias: params.alias });

  if (!result) {
    return <div style={{ padding: "2rem" }}>Alias not found 😢</div>;
  }

  redirect(result.url);
}
