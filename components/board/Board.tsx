import Header from "../Header";
import Column from "./Column";


const Board = () => {

    type boardData = {
        id: Number
        name: String;
        description: string;
        columns: any[];
    }

    const boardsList: boardData = {
        id: 1,
        name: 'board1',
        description: 'It is board 1',
        columns: [{ title: 'todo tasks', items: [{ name: 'learn react', description: 'task to learn react', dueDate: '07-11-2023' }, { name: 'learn nextjs', description: 'task to nextjs ', dueDate: '07-11-2023' }, { name: 'learn js', description: 'task to learn js', dueDate: '07-11-2023' }] }, { title: 'In progress', items: [{ name: 'learn react', description: 'task to learn react', dueDate: '07-11-2023' }, { name: 'learn nextjs', description: 'task to nextjs ', dueDate: '07-11-2023' }, { name: 'learn js', description: 'task to learn js', dueDate: '07-11-2023' }] }, { title: 'done', items: [{ name: 'learn react', description: 'task to learn react', dueDate: '07-11-2023' }, { name: 'learn nextjs', description: 'task to nextjs ', dueDate: '07-11-2023' }, { name: 'learn js', description: 'task to learn js', dueDate: '06-11-2023' }] }]
    }

    return (
        <section>
            <Header headTitle="Boards" btnContent="+ Create Column" />
            <div className="bg-white flex gap-4 justify-start overflow-x-auto p-6">
                {boardsList.columns.map((column) => {
                    return <Column columnTitle={column.title} items={column.items} />
                })}
            </div>
        </section>
    )
}

export default Board;