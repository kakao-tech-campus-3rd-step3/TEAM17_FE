import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative; 
  width: 30%;
`;

export const ToggleButton = styled.button`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.line.blue};
  background: ${({ theme }) => theme.colors.background.default};
  cursor: pointer;
  text-align: center;
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.line.blue};
  background: ${({ theme }) => theme.colors.background.default};
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  z-index: 10;
`;

export const DropdownItem = styled.li`
  padding: 0.6rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: ${({ theme }) => theme.colors.background.gray};
  }
`;
