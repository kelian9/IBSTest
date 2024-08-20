import ReposAPI from '@api/repos.api';
import useDebounce from '@hooks/useDebounce';
import { IRepository } from '@models/responses/IRepository';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Divider, List, ListItem, ListSubheader, MenuItem, Pagination, Select, TextField } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { sortValues } from './constants';
import styles from './style.module.scss';

const Home: React.FC = () => {
	const [count, setCount] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [searchSubstr, setSearchSubstr] = useState<string>('');
	const debouncedSearchSubstr: string = useDebounce(searchSubstr, 500);
	const [list, setList] = useState<any[]>([]);
	const [sortParam, setSortParam] = useState<number>(0);

	const getRepos = async () => {
		const response = await ReposAPI.getRepos(
			page,
			debouncedSearchSubstr,
			sortValues[sortParam].value,
			sortValues[sortParam].order,
		);
		setList(response.data.items);
		setCount(response.data.total_count);
	};

	const parseToCountFormat = (num: number) => {
		return num > 1000 ? (num / 1000).toFixed(2) + 'k' : num;
	};

	useEffect(() => {
		getRepos();
	}, [debouncedSearchSubstr, page, sortParam]);

	return (
		<div className={styles.container}>
			<TextField
				sx={{
					width: '100%',
					maxWidth: '1100px',
				}}
				label='Search'
				variant='outlined'
				value={searchSubstr}
				onChange={(event) => setSearchSubstr(event.target.value)}
			/>
			<List
				sx={{ width: '90%', maxWidth: '1100px', bgcolor: 'background.paper' }}
				subheader={
					<ListSubheader
						component='div'
						sx={{
							marginTop: '16px',
							padding: 0,
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<span className='count'>{parseToCountFormat(count)} results</span>
						<Select
							style={{
								width: '211px',
								height: '32px',
							}}
							value={sortParam}
							label='Sort'
							onChange={(event) => setSortParam(Number(event.target.value))}
						>
							{sortValues.map((sortParamVariant, index) => (
								<MenuItem value={index}>{sortParamVariant.name}</MenuItem>
							))}
						</Select>
					</ListSubheader>
				}
			>
				{list.map((repo: IRepository) => (
					<ListItem
						sx={{
							marginTop: '16px',
							height: '112px',
							padding: '16px',
							flexDirection: 'column',
							alignItems: 'flex-start',
							boxSizing: 'border-box',
							border: '1px solid #d0d7de',
							borderRadius: '6px',
						}}
					>
						<div className={styles.heading}>
							<img src={repo.owner.avatar_url} alt='' className={styles['repo-icon']} />
							<a href={repo.html_url} className={styles['repo-name']}>
								{repo.full_name}
							</a>
						</div>
						<p className={styles.description}>{repo.description}</p>
						<div className={styles['meta-info']}>
							<span className={styles.language}>{repo.language}</span>
							<Divider flexItem orientation='vertical' />
							<span className={styles.stars}>
								<StarBorderOutlinedIcon sx={{ marginRight: '5px' }} />
								{parseToCountFormat(repo.stargazers_count)}
							</span>
							<Divider flexItem orientation='vertical' />
							<span className={styles['last-commit-date']}>{moment(repo.updated_at).fromNow()}</span>
						</div>
					</ListItem>
				))}
			</List>
			<Pagination
				sx={{ marginTop: '20px' }}
				count={Math.ceil(count / 10)}
				page={page}
				onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
			/>
		</div>
	);
};

export default Home;
