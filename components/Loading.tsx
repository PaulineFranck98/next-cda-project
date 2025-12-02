'use client';

import { ClipLoader } from 'react-spinners';
import { useLoading } from '@/context/LoadingContext';

const Loading = () => {
	const { loading } = useLoading();

	if (!loading) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
			<ClipLoader color="#6838BC" size={54} />
		</div>
	);
};

export default Loading;
