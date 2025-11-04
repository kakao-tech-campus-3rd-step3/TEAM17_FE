import React from 'react';
import S from './Skeleton.styles';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '0.25rem',
  className,
}) => {
  return (
    <S.SkeletonContainer
      className={className}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
    >
      <S.SkeletonItem />
    </S.SkeletonContainer>
  );
};

export default Skeleton;
