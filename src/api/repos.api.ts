import { sortValues } from '@views/Home/constants';
import octokitInstance from './OctokitInstance';

class ReposAPI {
	public static async getRepos(
		page: number = 1,
		q: string = '',
		sort: 'best-match' | 'stars' | 'forks' | 'help-wanted-issues' | 'updated' = sortValues[0].value,
		order: 'desc' | 'asc' = sortValues[0].order,
	) {
		const response = await octokitInstance.request('GET /search/repositories', {
			per_page: 10,
			page,
			q: q + '+language:typescript',
			sort: sort === 'best-match' ? undefined : sort,
			order,
		});
		return response;
	}
}

export default ReposAPI;
