
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StyledSearcbar,
  StyledSearchForm,
  StyledSearchFormBtn,
  StyledSearchFormBtnLabel,
  StyledSearchFormInput,
} from './Searchbar.styled'
import { toast } from 'react-toastify';
import { SearchIcon } from './SearchIcon';
import { useState } from 'react';


const Searchbar = ({ query, onSubmitForm }) => {
  const [inputValue, setInputValue] = useState('')

  const handlerInputValue = (e) => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const value = inputValue.toLowerCase().trim()
    if (!value) {
      toast.error('Empty input')
      return
    }
    if (query === value) {
      toast.error('Enter new query')
      return
    }
    onSubmitForm(value)
  }

  return (
    <StyledSearcbar>
      <StyledSearchForm onSubmit={onSubmit}>
        <StyledSearchFormBtn type="submit" >
          <SearchIcon />
          <StyledSearchFormBtnLabel>Search</StyledSearchFormBtnLabel>
        </StyledSearchFormBtn>

        <StyledSearchFormInput
          type="text"
          autoComplete="off"
          onChange={handlerInputValue}
          name="searchInput"
          value={inputValue}
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledSearchForm>
    </StyledSearcbar>
  )
}

export default Searchbar;

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
}
