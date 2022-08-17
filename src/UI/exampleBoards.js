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
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
                // subtasks: [
                //     {
                //         id: uuidv4(),
                //         title: '',
                //         completed: false,
                //     },
                //     {
                //         id: uuidv4(),
                //         title: '',
                //         completed: false,
                //     }
                // ],
            },
            {
                id: uuidv4(),
                title: 'Set a meeting',
                status: 'Todo',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Reports',
                status: 'Doing',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Contacting Clients',
                status: 'Doing',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Report',
                status: 'Done',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Sent Report',
                status: 'Done',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
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
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Set a round-table discussion',
                status: 'Todo',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
        ],
        Doing: [
            {
                id: uuidv4(),
                title: 'Writing Quarterly Report',
                status: 'Doing',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Contacting stakeholders',
                status: 'Doing',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
        ],
        Done: [
            {
                id: uuidv4(),
                title: 'Finalized Contract',
                status: 'Done',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
            {
                id: uuidv4(),
                title: 'Sent Meeting Agenda',
                status: 'Done',
                isCardOpen: false,
                date: {
                    startDate: '',
                    dueDate: '',
                    deadlineTime: '',
                    completed: false,
                },
            },
        ],
    },
]

export default exampleBoards
