'use client';
import { useState, useContext, useEffect } from "react";
import Header from "../Header";
import Column from "./Column";
import { boardsContext } from "../boardsContext";
import { useParams } from 'next/navigation';
import Modal from "../Modal";
import data from '../../boardsData.json';


type boardData = {
    id: Number
    name: String;
    description: String;
    columns: any[];
}

const Board = () => {

    const params = useParams();

    const { boardsData,
        openedBoard,

        currentColumnId,
        currentDescriptionName,
        showModal,
        modalBtnContent,
        updateBoardsData,
        updateCurrentBoardName,
        updateCurrentDescription,
        updateModalState,
        updateModalBtnContent, updateCurrentBoardId, updateOpenedBoard } = useContext(boardsContext)

    useEffect(() => {
        if (boardsData) {
            const board = boardsData.find((board) => board.id === Number(params.slug));
            if (board) {
                updateOpenedBoard(board);
            }
        } else {
            updateBoardsData(data);
            const board = data.find((board) => board.id === Number(params.slug));
            if (board) {
                updateOpenedBoard(board);
            }
        }

    }, [boardsData])



    const boardsList: boardData = {
        id: 1,
        name: 'board1',
        description: 'It is board 1',
        columns: [{ title: 'todo tasks', items: [{ name: 'learn react', description: 'task to learn react', dueDate: '07-11-2023' }, { name: 'learn nextjs', description: 'task to nextjs ', dueDate: '07-11-2023' }, { name: 'learn js', description: 'task to learn js', dueDate: '07-11-2023' }] }, { title: 'In progress', items: [{ name: 'learn react', description: 'task to learn react', dueDate: '07-11-2023' }, { name: 'learn nextjs', description: 'task to nextjs ', dueDate: '07-11-2023' }, { name: 'learn js', description: 'task to learn js', dueDate: '07-11-2023' }] }, { title: 'done', items: [{ name: 'learn react', description: 'task to learn react', dueDate: '07-11-2023' }, { name: 'learn nextjs', description: 'task to nextjs ', dueDate: '07-11-2023' }, { name: 'learn js', description: 'task to learn js', dueDate: '06-11-2023' }] }]
    }

    function deepCopy(obj: any): any {
        if (obj === null || typeof obj !== 'object') {
            return obj; // If the object is not an object or is null, return it as is
        }

        if (Array.isArray(obj)) {
            // If the object is an array, create a new array and deep copy its elements
            return obj.map(item => deepCopy(item));
        }

        // If the object is an object, create a new object and deep copy its properties
        const copy: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copy[key] = deepCopy(obj[key]);
            }
        }

        return copy;
    }

    function createNewColumn(): void {


        if (openedBoard) {

            const newColumn = {
                id: openedBoard?.columns.length + 1,
                title: 'new column',
                items: [],
            }

            const updatedBoard = deepCopy(openedBoard);
            updatedBoard.columns = [newColumn, ...updatedBoard.columns];
            updateOpenedBoard(updatedBoard);
        }


    }

    function clickHandler(name: String, description: String): void {


        if (openedBoard) {

            const updatedBoard = deepCopy(openedBoard);

            const column = updatedBoard.columns.find((column: any) => column.id === currentColumnId);

            const newItem = {
                id: column.items.length + 1,
                name: name,
                description: description
            }


            const updatedColumns = updatedBoard.columns.map((column: any) => {
                if (column.id === currentColumnId) {
                    column.items = [newItem, ...column.items];
                }

                return column;
            })


            updatedBoard.columns = [...updatedColumns];
            updateOpenedBoard(updatedBoard);
            updateModalState(false);
        }
    }

    return (
        <section>
            <section className="p-4 mb-6 flex text-[#361F7A] text-xl font-bold justify-center shadow-lg shadow-black">
                Kanban Boards App
            </section>
            <Header headTitle="Boards" btnContent="+ Create Column" onClickHandler={() => createNewColumn()} />
            <div className="bg-white flex gap-4 justify-start overflow-x-auto p-6">
                {openedBoard?.columns.map((column) => {
                    return <Column columnTitle={column.title} items={column.items} id={column.id} />
                })}
            </div>
            {showModal && <Modal onClickHandler={clickHandler} />}
        </section>
    )
}

export default Board;