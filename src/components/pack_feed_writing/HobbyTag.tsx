import { useState } from 'react';
import {
  DropdownWrapper,
  ToggleButton,
  DropdownMenu,
  DropdownItem,
} from '@/components/pack_feed_writing/HobbyTagToggle.style';
import { ColumnWrapper } from '@/components/pack_feed_writing/Layout.style';
import { TitleStyle } from '@/components/pack_feed_writing/Title.style';

type HobbyTagProps = {
  onChange: (category: string) => void;
};

const HobbyTag = ({ onChange }: HobbyTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('전체');

  const options = ['전체', '베이킹', '캠핑', '독서', '헬스', '요리', '러닝'];

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <ColumnWrapper>
      <TitleStyle>취미 태그</TitleStyle>

      <DropdownWrapper>
        <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>{selected} ▼</ToggleButton>

        {isOpen && (
          <DropdownMenu>
            {options.map((option) => (
              <DropdownItem key={option} onClick={() => handleSelect(option)}>
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownWrapper>
    </ColumnWrapper>
  );
};

export default HobbyTag;
