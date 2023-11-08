'use client';
import { useState, useEffect } from "react";
import Header from "./Header";
import BoardsList from "./List";
import Modal from "./Modal";
import data from '../boardsData.json';

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

    const [showModal, setShowModal] = useState<boolean>(false);
    const [boardsData, setBoardsData] = useState<BoardsData[] | null>(null);
    const [boardName, setBoardName] = useState(''); // current board name
    const [description, setDescription] = useState(''); // current board description


    useEffect(() => {
        setBoardsData(data);
    }, [data])


    function showModalHandler(): void {
        setShowModal(true);
    }


    function closeModalHandler(): void {
        setShowModal(false);
    }

    return (
        <main>
            <section className="p-4 mb-6 flex justify-center shadow-lg shadow-black">
                Kanban Boards App
            </section>
            <Header headTitle="Boards" btnContent="+ Create Board" onClickHandler={showModalHandler} />
            <BoardsList boardsData={boardsData} setBoardsData={setBoardsData} setBoardDescription={setDescription} setBoardName={setBoardName} />
            {showModal && <Modal onClickHandler={closeModalHandler} setBoardsData={setBoardsData} boardName={boardName} setBoardName={setBoardName} description={description} setBoardDescription={setDescription} />}
        </main>
    )
}

export default Home;