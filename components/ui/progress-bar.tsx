"use client";

import React from "react";

type ProgressBarProps = {
	completion: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ completion }) => {
	return (
		<div className="w-full bg-gray-200 rounded-full h-3">
			<div
				className="bg-violet-600 h-3 rounded-full transition-all duration-300"
				style={{ width: `${completion}%` }}
			/>
		</div>
	);
};

export default ProgressBar;
