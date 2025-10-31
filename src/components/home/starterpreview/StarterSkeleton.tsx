import React from 'react';
import Skeleton from '@/components/common/Skeleton';
import { GridItem } from './StarterPreview.styles';
import styled from 'styled-components';

const SkeletonWrapper = styled(GridItem)`
  position: relative;
  background-color: transparent;
  overflow: hidden;
  display: block;

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const StarterSkeleton: React.FC = () => {
  return (
    <SkeletonWrapper>
      <Skeleton width="100%" height="100%" borderRadius="0.5rem" />
    </SkeletonWrapper>
  );
};

export default StarterSkeleton;
