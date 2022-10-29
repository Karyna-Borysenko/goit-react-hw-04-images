import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchIcon,
  SearchInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  //----Обновляем input----
  function handleInputChange(event) {
    setInput(event.currentTarget.value.toLowerCase());
  }

  //----Отправляем форму----
  function handleSubmit(event) {
    event.preventDefault();

    if (input.trim() === '') {
      toast('Enter image name, please!', { icon: '🧐' });
      return;
    }

    onSubmit(input);
    reset();
  }

  //----Очищаем input----
  function reset() {
    setInput('');
  }

  //----Рендер----
  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchIcon />
        </SearchButton>

        <SearchInput
          name="input"
          value={input}
          onChange={handleInputChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
      <Toaster position="top-right" />
    </SearchHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
