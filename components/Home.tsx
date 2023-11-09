'use client';
import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import BoardsList from "./List";
import Modal from "./Modal";
import data from '../boardsData.json';
import { boardsContext } from "./boardsContext";

type Items = {
    name: String;
    description: String;
    dueDate: String;
}

type Columns = {
    title: String;
    items: Items[];
}

type BoardsData = {
    id: Number
    name: String;
    description: string;
    columns: Columns[]
}

const Home = () => {

    const { boardsData,
        currentBoardId,
        currentBoardName,
        currentDescriptionName,
        showModal,
        modalBtnContent,
        updateBoardsData,
        updateCurrentBoardName,
        updateCurrentDescription,
        updateModalState,
        updateModalBtnContent, updateCurrentBoardId } = useContext(boardsContext)



    useEffect(() => {
        updateBoardsData(data);
    }, [data])


    function showModalHandler(): void {
        updateModalState(true);
    }


    function closeModalHandler(): void {
        updateModalState(false);
    }

    function clickHandler(boardName: String, description: String): void {
        if (modalBtnContent === "Add") {
            if (boardsData) {
                const newBoard = {
                    id: boardsData?.length + 1,
                    name: boardName,
                    description: description,
                    columns: [{ id: 1, title: 'To Do Tasks', items: [] }, { id: 2, title: 'In Progress', items: [] }, { id: 3, title: 'Completed', items: [] }]
                }

                updateBoardsData([newBoard, ...boardsData])
            }
        } else if (modalBtnContent === "Edit") {
            if (boardsData) {

                const updatedBoardsData = boardsData.map((board) => {
                    if (board.id === currentBoardId) {
                        board.name = boardName;
                        board.description = description;
                    }
                    return board;
                })

                updateBoardsData([...updatedBoardsData]);
                updateCurrentBoardName('');
                updateCurrentDescription('');
            }
        }


        closeModalHandler()

    }

    return (
        <main>
            <section className="p-4 mb-6 flex text-[#361F7A] text-xl font-bold justify-center shadow-lg shadow-black">
                Kanban Boards App
            </section>
            <Header headTitle="Boards" btnContent="+ Create Board" onClickHandler={showModalHandler} />
            <BoardsList />
            {showModal && <Modal onClickHandler={clickHandler} btnContent='Add' />}
        </main>
    )
}

export default Home;