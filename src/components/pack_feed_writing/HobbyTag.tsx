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
  onChange: (id: number) => void;
};

const HobbyTag = ({ onChange }: HobbyTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('전체');

  const options = [
    { id: 1, name: '베이킹' },
    { id: 2, name: '캠핑' },
    { id: 3, name: '러닝' },
    { id: 4, name: '독서' },
    { id: 5, name: '헬스' },
    { id: 6, name: '요리' },
  ];

  const handleSelect = (option: { id: number; name: string }) => {
    setSelected(option.name);
    setIsOpen(false);
    onChange(option.id);
  };

  return (
    <ColumnWrapper>
      <TitleStyle>취미 태그</TitleStyle>
      <DropdownWrapper>
        <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>{selected} ▼</ToggleButton>

        {isOpen && (
          <DropdownMenu>
            {options.map((option) => (
              <DropdownItem key={option.id} onClick={() => handleSelect(option)}>
                {option.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownWrapper>
    </ColumnWrapper>
  );
};

export default HobbyTag;
