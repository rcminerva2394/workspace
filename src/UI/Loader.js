import React from 'react'
import styled from 'styled-components'

const Loader = () => {
    return <LoaderWrapper />
}

const LoaderWrapper = styled.div`
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid blue;
    border-bottom: 8px solid blue;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

export default Loader
