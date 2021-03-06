/* eslint-disable no-unused-expressions */
'use strict'

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

import SimpleTimeInput from '../../src/components/SimpleTimeInput'

describe('<SimpleTimeInput />', () => {
  it('renders an input field', () => {
    const wrapper = mount(
      <SimpleTimeInput value='' clockMode={12} />
    )
    expect(wrapper.find('input')).to.have.lengthOf(1)
  })

  it('allows passing a custom component to be rendered on "as" prop', () => {
    const CustomInput = (props) => <div className='custom-input'><input {...props} /></div>
    const wrapper = mount(
      <SimpleTimeInput as={CustomInput} value='' clockMode={12} />
    )
    expect(wrapper.find('.custom-input input')).to.have.lengthOf(1)
  })

  it('forwards props', () => {
    const wrapper = mount(
      <SimpleTimeInput
        value=''
        clockMode={12}
        foo='bar'
        className='my-input-class'
      />
    )
    const inputProps = wrapper.find('input').props()
    expect(inputProps).to.have.property('foo', 'bar')
    expect(inputProps).to.have.property('className', 'my-input-class')
  })

  it('forwards ref', () => {
    const ref = React.createRef()
    const wrapper = mount(
      <SimpleTimeInput ref={ref} value='' clockMode={12} />
    )
    const input = wrapper.find('input').first().getDOMNode()
    expect(input).to.be.equal(ref.current)
  })

  it('renders input field with default value', () => {
    const wrapper = mount(
      <SimpleTimeInput value='14:00' clockMode={12} />
    )
    expect(wrapper.find('input').props().value).to.be.equal('2:00pm')
  })

  it('re-renders when value prop is changed', () => {
    const wrapper = mount(
      <SimpleTimeInput value='14:00' clockMode={12} />
    )
    wrapper.setProps({ value: '15:00' })
    wrapper.update()
    expect(wrapper.find('input').props().value).to.be.equal('3:00pm')
  })

  it('re-renders when clockMode prop is changed', () => {
    const wrapper = mount(
      <SimpleTimeInput value='14:00' clockMode={12} />
    )
    wrapper.setProps({ clockMode: 24 })
    wrapper.update()
    expect(wrapper.find('input').props().value).to.be.equal('14:00')
  })

  describe('Blur behavior', () => {
    it('updates value on blur if time typed is valid', () => {
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: '5a' } })
      input.simulate('blur')
      wrapper.update()
      expect(wrapper.find('input').props().value).to.be.equal('5:00am')
    })
    
    it('calls onValueChange on blur if time typed is valid and has changed', () => {
      const onValueChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onValueChange={onValueChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: '5a' } })
      input.simulate('blur')
      wrapper.update()
      expect(onValueChange.calledOnce).to.be.true
      expect(onValueChange.firstCall.args).to.be.deep.equal(['05:00'])
    })
  
    it("doesn't call onValueChange on blur if time typed is valid but hasn't changed", () => {
      const onValueChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onValueChange={onValueChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: '2p' } })
      input.simulate('blur')
      expect(onValueChange.called).to.be.false
    })
  
    it("doesn't call onValueChange while user is typing", () => {
      const onValueChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onValueChange={onValueChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: '3p' } })
      expect(onValueChange.called).to.be.false
    })

    it("returns to previous valid time on blur and doesn't call onValueChange if time typed is invalid", () => {
      const onValueChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onValueChange={onValueChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'wat' } })
      input.simulate('blur')
      wrapper.update()
      expect(wrapper.find('input').props().value).to.be.equal('2:00pm') // goes back to previous value
      expect(wrapper.find('input').props().className).to.be.equal('') // no invalid class
      expect(onValueChange.called).to.be.false // onValueChange callback not called
    })

    it("returns to formatted time on blur and doesn't call onValueChange if time inferred is the same as previous time", () => {
      const onValueChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onValueChange={onValueChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: '14:' } })
      input.simulate('blur')
      wrapper.update()
      expect(wrapper.find('input').props().value).to.be.equal('2:00pm') // goes back to previous value
      expect(wrapper.find('input').props().className).to.be.equal('') // no invalid class
      expect(onValueChange.called).to.be.false // onValueChange callback not called
    })
  })

  describe('onChange', () => {
    it('forwards onChange', () => {
      const onChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onChange={onChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: '5a' } })
      wrapper.update()
      expect(onChange.calledOnce).to.be.true
      const event = onChange.firstCall.args[0]
      expect(event.target.value).to.be.deep.equal('5a')
    })

    it('passes additional information as second argument of onChange (valid)', () => {
      const onChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onChange={onChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: '5a' } })
      wrapper.update()
      expect(onChange.calledOnce).to.be.true
      const info = onChange.firstCall.args[1]
      expect(info).to.be.deep.equal({ valid: true, time: '05:00' })
    })

    it('passes additional information as second argument of onChange (invalid)', () => {
      const onChange = sinon.spy()
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} onChange={onChange} />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'wat' } })
      wrapper.update()
      expect(onChange.calledOnce).to.be.true
      const info = onChange.firstCall.args[1]
      expect(info).to.be.deep.equal({ valid: false, time: undefined })
    })
  })

  describe('Invalid time style', () => {
    it('adds invalid-time class while user is typing invalid time', () => {
      const wrapper = mount(
        <SimpleTimeInput value='14:00' clockMode={12} className='my-input' />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'wat' } })
      expect(wrapper.find('input').props().className).to.be.equal('my-input invalid-time')
    })
  
    it('adds custom invalid time class while user is typing invalid time', () => {
      const wrapper = mount(
        <SimpleTimeInput
          value='14:00'
          clockMode={12}
          className='my-input'
          invalidClassName='custom-invalid-time'
        />
      )
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'wat' } })
      expect(wrapper.find('input').props().className).to.be.equal('my-input custom-invalid-time')
    })
  })
})
