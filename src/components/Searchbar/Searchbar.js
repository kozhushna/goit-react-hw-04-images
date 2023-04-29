import PropTypes from 'prop-types';
import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = event =>
    setSearchQuery(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query === '') {
      toast.warn('Please input text for serch.');
      return;
    }
    onSubmit(query);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <FcSearch size="2em" />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
