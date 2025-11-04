import { useState } from 'react';
import {
  DropdownWrapper,
  ToggleButton,
  DropdownMenu,
  DropdownItem,
} from '@/components/pack_feed_writing/HobbyTagToggle.style';
import { ColumnWrapper } from '@/components/pack_feed_writing/Layout.style';
import { TitleStyle } from '@/components/pack_feed_writing/Title.style';
import { options } from '@/constants/categories'; 

type HobbyTagProps = {
  onChange: (id: number) => void;
};

const HobbyTag = ({ onChange }: HobbyTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('전체');



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
