import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export const SearchIcon = () => {
  return (
    <IconContext.Provider value={{ size: '1.5em' }}>
      <FaSearch />
    </IconContext.Provider>
  );
};
