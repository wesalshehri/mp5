import clientPromise from '../../lib/mongo';
import { redirect } from 'next/navigation';

export default async function AliasRedirect({ params }: { params: { alias: string } }) {
    const client = await clientPromise;
    const db = client.db('urlshortener');
    const collection = db.collection('urls');

    const result = await collection.findOne({ alias: params.alias });

    if (!result) {
        return <h1>Alias not found</h1>;
    }

    redirect(result.url); // server-side redirect
}
