import React from "react"
import renderer from "react-test-renderer"
import Index from "../index"

describe(`Header`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<Header siteTitle="Default Starter" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe(`Index`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<Index />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
