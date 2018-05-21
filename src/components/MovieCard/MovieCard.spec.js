import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from './MovieCard';

describe('MovieCard', () => {
  let movieCard;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      movie_id: 12,
      poster_path: 'some_path',
      title: 'blitz',
      release_date: '12-13-14',
      vote_average: 8,
      overview: 'hi ho',
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn()
    };
    movieCard = shallow(<MovieCard {...mockProps} />);
  });

  it('matches the snapshot', () => {
    expect(movieCard).toMatchSnapshot();
  });

  it('calls toggleFavorite when favoite button is clicked', () => {
    movieCard.find('.favoriteToggle').simulate('click');

    expect(mockProps.toggleFavorite).toHaveBeenCalledTimes(1);
  });
});
