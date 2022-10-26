import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchIcon,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends React.Component {
  state = {
    input: '',
  };

  //----Обновляем input----
  handleInputChange = event => {
    this.setState({ input: event.currentTarget.value.toLowerCase() });
  };

  //----Отправляем форму----
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.input.trim() === '') {
      toast('Enter image name, please!', {
        icon: '🧐',
      });
      return;
    }

    this.props.onSubmit(this.state.input);
    this.reset();
  };

  //----Очищаем input----
  reset = () => {
    this.setState({ input: '' });
  };

  //----Рендер----
  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchIcon />
          </SearchButton>

          <SearchInput
            name="input"
            value={this.state.input}
            onChange={this.handleInputChange}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
