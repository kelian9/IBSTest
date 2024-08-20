interface ISortValue {
	name: string;
	value: 'best-match' | 'stars' | 'forks' | 'updated';
	order: 'desc' | 'asc';
}
export const sortValues: ISortValue[] = [
	{
		name: 'Best match',
		value: 'best-match',
		order: 'desc',
	},
	{
		name: 'Most stars',
		value: 'stars',
		order: 'desc',
	},
	{
		name: 'Fewest stars',
		value: 'stars',
		order: 'asc',
	},
	{
		name: 'Most forks',
		value: 'forks',
		order: 'desc',
	},
	{
		name: 'Fewest forks',
		value: 'forks',
		order: 'asc',
	},
	{
		name: 'Recently updated',
		value: 'updated',
		order: 'desc',
	},
	{
		name: 'Least recently updated',
		value: 'updated',
		order: 'asc',
	},
];
