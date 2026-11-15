// Android calls the same public WordPress API directly; no hosted app RPC is needed.
import { fetchBeat, fetchBeats, fetchCategories, fetchSitePage, type BeatQuery } from './wordpress';

export const listBeats = ({ data }: { data: BeatQuery }) => fetchBeats(data);
export const getBeat = ({ data }: { data: { slug: string } }) => fetchBeat(data.slug);
export const listCategories = () => fetchCategories();
export const getSitePage = ({ data }: { data: { slug: string } }) => fetchSitePage(data.slug);