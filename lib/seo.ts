export function buildDescription(post: any): string {
    return post.data.description || (post.body.slice(0, 120).replace(/\n+/g, ' ') + '...');
}