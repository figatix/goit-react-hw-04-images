
import { StyledButton } from './Button.styled';
import PropTypes from 'prop-types'

const LoadMoreBtn = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick} type="button">Load more</StyledButton>
  )
}
export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}

