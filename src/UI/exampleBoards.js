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
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Set a meeting',
                status: 'Todo',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Reports',
                status: 'Doing',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Contacting Clients',
                status: 'Doing',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Report',
                status: 'Done',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Sent Report',
                status: 'Done',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
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
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Set a round-table discussion',
                status: 'Todo',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Quarterly Report',
                status: 'Doing',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Contacting stakeholders',
                status: 'Doing',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Contract',
                status: 'Done',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Sent Meeting Agenda',
                status: 'Done',
                date: {
                    startDate: '',
                    dueDate: '',
                    time: '',
                    completed: false,
                },
            },
        ],
    },
]

export default exampleBoards
