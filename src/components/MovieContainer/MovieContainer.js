import React, { Component } from 'react';
import { connect } from 'react-redux';
import getMovieData from '../../utils/apiCall';

export class MovieContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieData: []
    }
  }

  fetchMovieData = async () => {
    const movieData = await getMovieData();
    const dirtyMovieData = await movieData.results;
    
    this.setState({
      movieData: dirtyMovieData
    });
  };

  componentDidMount = () => {
    this.fetchMovieData();
  }

  cleanMovieData = () => {
    const movieData = this.state.movieData;

    return movieData.map(foo => foo.title);
  }

  render() {
    return (
      <div>
        <hr />
        <h1>
          {this.cleanMovieData()}
        </h1>
        <hr />
      </div>
    );
  }
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MovieContainer);

// {
//   users: {
//     user_id: {
//       favorites: {
//         movie_id: {
//           title: 'barf'
//           poster: img
//           release: 2008
//           vote_avg: 3
//           overview: 'stuff happened'
//         }
//       }
//     }
//   }
  
// }