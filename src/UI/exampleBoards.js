import { v4 as uuidv4 } from 'uuid'

const exampleBoards = [
    {
        id: uuidv4(),
        boardName: 'Project Sunrise',
        Todo: [
            {
                id: uuidv4(),
                title: 'Write Todos',
                status: 'Todo',
            },
            {
                id: uuidv4(),
                title: 'Set a meeting',
                status: 'Todo',
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Reports',
                status: 'Doing',
            },
            {
                id: uuidv4(),
                title: 'Contacting Clients',
                status: 'Doing',
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Report',
                status: 'Done',
            },
            {
                id: uuidv4(),
                title: 'Sent Report',
                status: 'Done',
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
                status: 'Todo',
            },
            {
                id: uuidv4(),
                title: 'Set a round-table discussion',
                status: 'Todo',
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Quarterly Report',
                status: 'Doing',
            },
            {
                id: uuidv4(),
                title: 'Contacting stakeholders',
                status: 'Doing',
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Contract',
                status: 'Done',
            },
            {
                id: uuidv4(),
                title: 'Sent Meeting Agenda',
                status: 'Done',
            },
        ],
    },
]

export default exampleBoards
