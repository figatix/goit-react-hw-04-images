import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from 'components/Loader';
import LoadMoreBtn from 'components/Button/Button';
import { StyledApp } from './App.styled'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from './services/Api';
import PropTypes from 'prop-types'

const PER_PAGE = 12

const App = () => {
  const [query, setQuery] = useState('');
  const [queryHits, setQueryHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query === '' && page === 1) return;
    fetchImages();
  }, [query, page])

  const fetchImages = async () => {
    setIsLoading(true)

    try {
      const { hits, totalHits } = await getImages(query, page)

      if (totalHits === 0) {
        toast.error(`Oops... We can't find ${query}`)
        // 
        setStatus('idle')
        setTotalHits(0)
        setPage(1)
        return;
        // 
      }

      setTotalHits(totalHits)
      setQueryHits((prevState) => [...prevState, ...hits])

      if (page !== 1) {
        scroll();
      }
      /*
      ? Ця колбек функція для скролу має стояти саме в методі this.setState, щоб як зміниться стейт =відбувалась прокрутка. Якщо винести цю функцію окремо, то ефект скролу обламаний. Напевно, через асинхронність.
      */
    } catch (error) {
      toast.error(`Something went wrong..${error?.message}`)
      setError('rejected')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitForm = (value) => {
    setQuery(value)
    setQueryHits([])
    setTotalHits(0)
    setPage(1)
    setError(null)
  }

  const handleMoreBtnClick = () => {
    setPage((prevState => prevState + 1))
  }

  const scroll = () => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild?.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  }

  const isLoadMoreVisible = queryHits.length < totalHits && (page < Math.ceil(totalHits / PER_PAGE));

  return (
    <StyledApp >
      <Searchbar
        query={query}
        onSubmitForm={onSubmitForm}

      />
      <ImageGallery
        queryHits={queryHits}
      >
      </ImageGallery>
      {isLoading && <Loader />}
      {isLoadMoreVisible && <LoadMoreBtn onClick={handleMoreBtnClick} />}
      <ToastContainer autoClose={2000} />
      {status === 'rejected' &&
        <div>{error?.message}</div>}

    </StyledApp >
  );

};

App.propTypes = {
  query: PropTypes.string,
}

export { App };




// class App extends Component {
//   static propTypes = {
//     query: PropTypes.string,
//   }

//   state = {
//     query: '',
//     queryHits: [],
//     totalHits: 0,
//     status: 'idle',
//     error: null,
//     page: 1,
//     isLoading: false,
//   }

//   componentDidUpdate(_, prevState) {
//     const { page, query } = this.state;
//     const isQueryChanged = prevState.query !== query;
//     const isPageChanged = prevState.page !== page;


//     if (isPageChanged || isQueryChanged) {
//       this.fetchImages();
//     }
//   }

//   fetchImages = async () => {
//     const { page, query } = this.state;

//     this.setState({ isLoading: true })

//     try {
//       const { hits, totalHits } = await getImages(query, page)

//       if (totalHits === 0) {
//         toast.error(`Oops... We can't find ${query}`)
//         return this.setState({
//           status: 'idle',
//           totalHits: 0,
//           page: 1,
//         })
//       }

//       this.setState((prevState) => ({
//         queryHits: [...prevState.queryHits, ...hits],
//         totalHits,
//       })
//         , () => {
//           if (this.state.page !== 1) {
//             this.scroll();
//           }
//         })
//       /*
//       ? Ця колбек функція для скролу має стояти саме в методі this.setState, щоб як зміниться стейт =відбувалась прокрутка. Якщо винести цю функцію окремо, то ефект скролу обламаний. Напевно, через асинхронність.
//       */
//     } catch (error) {
//       toast.error(`Something went wrong..${error?.message}`)
//       this.setState({ error, status: 'rejected' })
//     } finally {
//       this.setState({ isLoading: false }
//       );
//     }
//   }

//   onSubmitForm = (value) => {
//     this.setState({
//       query: value,
//       queryHits: [],
//       totalHits: 0,
//       page: 1,
//       error: null
//     })
//   }

//   handleMoreBtnClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   }

//   scroll = () => {
//     const { height: cardHeight } = document
//       .querySelector('.gallery')
//       .firstElementChild?.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 1.5,
//       behavior: 'smooth',
//     });
//   }

//   render() {
//     const { query, queryHits, status, error, totalHits, isLoading, page } = this.state;
//     const isLoadMoreVisible = queryHits.length < totalHits && (page < Math.ceil(totalHits / PER_PAGE));

//     return (
//       <StyledApp >
//         <Searchbar
//           query={query}
//           onSubmitForm={this.onSubmitForm}

//         />
//         <ImageGallery
//           queryHits={queryHits}
//         >
//         </ImageGallery>
//         {isLoading && <Loader />}
//         {isLoadMoreVisible && <LoadMoreBtn onClick={this.handleMoreBtnClick} />}
//         <ToastContainer autoClose={2000} />
//         {status === 'rejected' &&
//           <div>{error?.message}</div>}

//       </StyledApp >
//     );
//   }
// };

// export { App };