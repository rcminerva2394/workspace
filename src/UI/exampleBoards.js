import { v4 as uuidv4 } from 'uuid'

const exampleBoards = [
    {
        id: uuidv4(),
        boardName: 'Project Sunrise',
        Todo: [
            {
                id: uuidv4(),
                title: 'Write Todos',
            },
            {
                id: uuidv4(),
                title: 'Set a meeting',
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Reports',
            },
            {
                id: uuidv4(),
                title: 'Contacting Clients',
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Report',
            },
            {
                id: uuidv4(),
                title: 'Sent Report',
            },
        ],
    },
    {
        id: uuidv4(),
        boardName: 'Project Noontime',
        Todo: [
            {
                id: uuidv4(),
                title: 'Write Invitation',
            },
            {
                id: uuidv4(),
                title: 'Set a round-table discussion',
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Quarterly Report',
            },
            {
                id: uuidv4(),
                title: 'Contacting stakeholders',
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Contract',
            },
            {
                id: uuidv4(),
                title: 'Sent Meeting Agenda',
            },
        ],
    },
]

export default exampleBoards
