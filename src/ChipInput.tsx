// ChipInput.tsx

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import './ChipInput.css';

interface ChipInputProps {
  items: string[];
}

const ChipInput: React.FC<ChipInputProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleItemSelect = (item: string) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setInputValue('');
  };

  const handleChipRemove = (removedItem: string) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item !== removedItem));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
      // Highlight the last chip when backspace is pressed with an empty input
      const lastChip = selectedItems[selectedItems.length - 1];
      setInputValue(lastChip);
      handleChipRemove(lastChip);
    }
  };

  useEffect(() => {
    if (inputValue === '' && selectedItems.length > 0) {
      // Clear input when all chips are removed
      setInputValue('');
    }
  }, [inputValue, selectedItems]);

  return (
    <div className="chip-input-container">
      <div className="chips-container">
        {selectedItems.map((item) => (
          <div key={item} className="chip">
            {item} <span onClick={() => handleChipRemove(item)}>X</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <div className="suggestions-container">
        {items
          .filter((item) => !selectedItems.includes(item) && item.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item) => (
            <div key={item} className="suggestion" onClick={() => handleItemSelect(item)}>
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChipInput;
