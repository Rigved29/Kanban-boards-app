'use client';
import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { boardsContext } from './boardsContext';

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

type Props = {
    onClickHandler: any;
    btnContent?: String;
    noDiscription?: boolean;
}

const Modal = (props: Props) => {

    const [boardName, setBoardName] = useState<any>(''); // current board name
    const [description, setDescription] = useState<any>(''); // current board description

    const { boardsData,
        currentBoardName,
        currentDescriptionName,
        showModal,
        modalBtnContent,
        updateBoardsData,
        updateCurrentBoardName,
        updateCurrentDescription,
        updateModalState,
        updateModalBtnContent } = useContext(boardsContext)

    // function createBoardHandler(): void {
    //     if (boardsData) {
    //         const newBoard = {
    //             id: boardsData?.length + 1,
    //             name: boardName,
    //             description: description,
    //             columns: [{ title: 'To Do Tasks', items: [] }, { title: 'In Progress', items: [] }, { title: 'Completed', items: [] }]
    //         }

    //         updateBoardsData([newBoard, ...boardsData])
    //     }

    //     props.onClickHandler()

    // }

    useEffect(() => {
        setBoardName(currentBoardName);
        setDescription(currentDescriptionName);
    }, [])

    return (
        <div className="absolute w-1/3 top-60 left-1/3 bg-white p-2 rouned-md drop-shadow-xl">
            <div className='w-full flex justify-end'><AiOutlineClose className='cursor-pointer' onClick={() => updateModalState(false)} /></div>

            <div className='flex flex-col m-2'>
                <input type="text" name='boardName' value={boardName} placeholder="Board Name" className="p-2 my-2 bg-[#F1EFFA] rounded-md outline-none" onChange={(e) => setBoardName(e.target.value)} />
                {!props.noDiscription && <input type="text" name='description' value={description} placeholder="Description" className="p-2 my-2 bg-[#F1EFFA] rounded-md outline-none" onChange={(e) => setDescription(e.target.value)} />}
                <button className="bg-[#361F7A] text-white rounded-md py-2 px-4 mt-4" onClick={() => props.onClickHandler(boardName, description)}>
                    {modalBtnContent}
                </button>
            </div>
        </div>
    )
}

export default Modal;