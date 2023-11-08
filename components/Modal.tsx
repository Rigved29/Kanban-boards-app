'use client';
import React from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

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
    boardName: any;
    description: any;
    setBoardsData: React.Dispatch<React.SetStateAction<BoardsData[] | null>>;
    setBoardName: React.Dispatch<React.SetStateAction<string>>
    setBoardDescription: React.Dispatch<React.SetStateAction<string>>
}

const Modal = (props: Props) => {



    function createBoardHandler(): void {

        props.setBoardsData((prevState) => {
            if (prevState) {
                const newBoard = {
                    id: prevState?.length + 1,
                    name: props.boardName,
                    description: props.description,
                    columns: [{ title: 'To Do Tasks', items: [] }, { title: 'In Progress', items: [] }, { title: 'Completed', items: [] }]
                }
                return [newBoard, ...prevState]
            } else {
                return prevState;
            }

        })

        props.onClickHandler()

    }

    return (
        <div className="absolute w-1/3 top-60 left-1/3 bg-white p-2 rouned-md drop-shadow-xl">
            <div className='w-full flex justify-end'><AiOutlineClose className='cursor-pointer' onClick={() => props.onClickHandler()} /></div>

            <div className='flex flex-col m-2'>
                <input type="text" name='boardName' value={props.boardName} placeholder="Board Name" className="p-2 my-2 bg-[#F1EFFA] rounded-md outline-none" onChange={(e) => props.setBoardName(e.target.value)} />
                <input type="text" name='description' value={props.description} placeholder="Description" className="p-2 my-2 bg-[#F1EFFA] rounded-md outline-none" onChange={(e) => props.setBoardDescription(e.target.value)} />
                <button className="bg-[#361F7A] text-white rounded-md py-2 px-4 mt-4" onClick={createBoardHandler}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default Modal;