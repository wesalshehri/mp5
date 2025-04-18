import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function POST(req: Request) {
    try {
        const { alias, url } = await req.json();

        // Simple URL validation
        try {
            new URL(url);
        } catch {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('urlshortener');
        const collection = db.collection('urls');

        const existing = await collection.findOne({ alias });
        if (existing) {
            return NextResponse.json({ error: 'Alias already exists' }, { status: 400 });
        }

        await collection.insertOne({ alias, url });
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
