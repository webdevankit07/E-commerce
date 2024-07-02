'use client';
import { CirclesWithBar } from 'react-loader-spinner';

interface LoadingProps {
    className?: string;
    color?: string;
    height?: number;
}

const Loading = ({ className, color = '#494949', height = 70 }: LoadingProps) => {
    return (
        <div className={`flex items-center justify-center min-h-[${height}vh] ${className}`}>
            <CirclesWithBar
                visible={true}
                height='80'
                width='80'
                color={color}
                outerCircleColor={color}
                innerCircleColor={color}
                barColor={color}
                ariaLabel='oval-loading'
            />
        </div>
    );
};

export default Loading;
