import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  it('matches the snapshot', () => {
    expect(app).toMatchSnapshot();
  });
});