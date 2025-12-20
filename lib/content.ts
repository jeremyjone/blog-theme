import { getCollection } from 'astro:content';

export async function getPublishedBlog() {
    const all = await getCollection('blog');
    return all
        .filter((p: any) => !p.data.draft)
        .sort((a: any, b: any) => Date.parse(b.data.date) - Date.parse(a.data.date));
}

export async function getPublishedNotes() {
    const all = await getCollection('notes');
    return all
        .filter((n: any) => !n.data.draft)
        .sort((a: any, b: any) => Date.parse(b.data.date) - Date.parse(a.data.date));
}