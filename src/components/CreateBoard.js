import React from 'react'
import SectionWrapper from '../UI/SectionWrapper'
import Button from '../UI/Button'

const CreateBoard = ({ onAddBoard }) => {
    return (
        <SectionWrapper>
            <h2>Explore</h2>
            <p>Create a Board</p>
            <Button onClick={onAddBoard} primary>
                Create a New Board
            </Button>
        </SectionWrapper>
    )
}

export default CreateBoard
