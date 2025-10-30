import React from 'react';
import Skeleton from '@/components/common/Skeleton';
import { GridItem } from './StarterPreview.styles';

const StarterSkeleton: React.FC = () => {
  return (
    <GridItem>
      <Skeleton height="100%" borderRadius="0.5rem" />
    </GridItem>
  );
};

export default StarterSkeleton;
