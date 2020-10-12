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
      <SimpleTimeInput time='' clockMode={12} />
    )
    expect(wrapper.find('input')).to.have.lengthOf(1)
  })

  it('forwards props', () => {
    const wrapper = mount(
      <SimpleTimeInput
        time=''
        clockMode={12}
        foo='bar'
        className='my-input-class'
      />
    )
    const inputProps = wrapper.find('input').props()
    expect(inputProps).to.have.property('foo', 'bar')
    expect(inputProps).to.have.property('className', 'my-input-class')
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
})
