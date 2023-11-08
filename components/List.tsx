

import { useState, useEffect } from 'react';
import BoardListItem from "./ListItem";

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
    boardsData: BoardsData[] | null;
    setBoardsData: React.Dispatch<React.SetStateAction<BoardsData[] | null>>,
    setBoardName: React.Dispatch<React.SetStateAction<string>>;
    setBoardDescription: React.Dispatch<React.SetStateAction<string>>
}


const BoardsList = (props: Props) => {




    return (
        <section>
            <div className='flex justify-between py-2 px-4 mx-2 rounded-md text-[#361F7A] font-semibold border-b-2 border-[#F1EFFA]'>
                <span className='w-1/3 text-start'>SI No:</span>
                <span className='w-1/3 text-start'>Name</span>
                <span className='w-1/3 text-start'>Description</span>
                <span className='w-1/3 text-end'>Actions</span>
            </div>
            <ul>
                {props.boardsData?.map((board, i) => {
                    return <BoardListItem boardName={board.name} boardDescription={board.description} id={board.id} sno={i + 1} setBoardsData={props.setBoardsData} setBoardDescription={props.setBoardDescription} setBoardName={props.setBoardName} />
                })}
            </ul>
        </section>
    )
}

export default BoardsList;