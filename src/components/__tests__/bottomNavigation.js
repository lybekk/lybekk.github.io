import React from "react"
import renderer from "react-test-renderer"

import BottomNavigation from "../bottomNavigation"

describe("BottomNavigation", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<BottomNavigation />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})