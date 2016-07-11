import React from 'react'
import { Peg } from 'components/Peg'
import { shallow } from 'enzyme'

describe('(Presentation) Peg', () => {
  it('should render a div show the peg\'s id, icon and xy coords when not placed', () => {
    const mockPeg = { id: '1', x: 5, y: 2 };

    const wrapper = shallow(<Peg peg={ peg } height="40" width="28" />);

    expect(wrapper.contains('x:5,y:2')).to.be.true;
  });
})
