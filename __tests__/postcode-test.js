import React from 'react';
import { shallow } from 'enzyme';

jest.dontMock('../containers/BeerContainer')

const BeerContainer = require('../containers/BeerContainer');

describe('<BeerContainer />', () => {
    it ('should render 4 <area /> components', () => {
        const wrapper = shallow('<BeerContainer />');
        expect(wrapper.find(area)).to.have.length(4);
    });
});
