export function relatedByTags(current: any, all: any[], limit = 5) {
    const set = new Set(current.data.tags);
    const scored = all
        .filter((p: any) => p.slug !== current.slug)
        .map((p: any) => {
            const inter = p.data.tags.filter((t: any) => set.has(t)).length;
            return { post: p, score: inter };
        })
        .filter((x: any) => x.score > 0)
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, limit)
        .map((x: any) => x.post);
    return scored;
}