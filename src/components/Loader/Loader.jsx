import React, { Component } from 'react';
import StyledLoader from './Loader.styled'

export default class Loader extends Component {

  render() {

    return (

      <StyledLoader className="preloader">
        <hr />
        <hr />
        <hr />
        <hr />
      </StyledLoader>
    )
  }
}