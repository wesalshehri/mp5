import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongo';

type PageProps = {
  params: {
    alias: string;
  };
};

export default async function Page({ params }: PageProps) {
  const client = await clientPromise;
  const db = client.db(); // defaults to DB name in your URI
  const urlEntry = await db.collection('shorturls').findOne({ alias: params.alias });

  if (!urlEntry) {
    return <div>Alias not found.</div>;
  }

  redirect(urlEntry.url);
}
