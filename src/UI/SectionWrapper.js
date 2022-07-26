import React from 'react'
import styled from 'styled-components'

const SectionWrapper = ({ children }) => {
    return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.section`
    line-height: 1;
    margin-bottom: 30rem;
`
export default SectionWrapper
