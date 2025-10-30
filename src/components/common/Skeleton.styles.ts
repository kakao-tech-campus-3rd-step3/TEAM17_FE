import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f3f4f6;
`;

export const SkeletonItem = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f3f4f6 0px, #e5e7eb 40px, #f3f4f6 80px);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export default {
  SkeletonContainer,
  SkeletonItem,
};
