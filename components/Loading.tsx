'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [pathname]);

    if(!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
            <PulseLoader color="#602DB9" size={12} />
        </div>
    );
};

export default Loading;