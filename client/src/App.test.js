// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { configure, mount } from 'enzyme';
import Card from './components/Card/Card';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });

describe('Dog Card', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Card name='Harry' temperament='' weight='3 - 8'/>)
  })
  it('should render a img tag', () => {
    expect(wrapper.find('img')).toHaveLength(2)
  });
  it('should render a li tag', () => {
    expect(wrapper.find('li')).toHaveLength(2)
  });
  it('should render a img tag', () => {
    expect(wrapper.find('img')).toHaveLength(2)
  });
  it('should render a figure tag', () => {
    expect(wrapper.find('figure')).toHaveLength(2)
  });
  it('should render a figcaption', () => {
    expect(wrapper.find('figcaption')).toHaveLength(1)
  });
  it('figcaption should render the name Harry passed by props', () => {
    expect(wrapper.find('figcaption').text()).toEqual('Harry');
  });
  it('should render a ul tag', () => {
    expect(wrapper.find('ul')).toHaveLength(1)
  });
  it('should render a span tag', () => {
    expect(wrapper.find('span')).toHaveLength(8)
  });
  it('first li should render None if temperament given in props is an empty string', () => {
    expect(wrapper.find('li').at(0).text()).toEqual('None');
  })
  it('second li should render the weight values given in props followed by the word kg', () => {
    expect(wrapper.find('li').at(1).text()).toEqual('3 - 8 kg');
  })

})