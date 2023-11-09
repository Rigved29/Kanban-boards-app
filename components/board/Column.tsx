import { useState, useContext, useEffect } from "react";
import { boardsContext } from "../boardsContext";
import ItemCard from './ItemCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { MdEdit, MdDelete } from 'react-icons/md';

type Props = {
    id: Number;
    columnTitle: String;
    items: any[];
}

const Column = (props: Props) => {

    const [editColumn, setEditColumn] = useState<boolean>(false);
    const [columntitle, setColumnTitle] = useState<any>(props.columnTitle);


    const {
        openedBoard,
        updateModalState,
        updateModalBtnContent, updateCurrentBoardId, updateOpenedBoard, updateCurrentColumnId } = useContext(boardsContext);

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

    function deleteColumnHandler(id: Number): void {



        const updatedBoard = deepCopy(openedBoard);

        const updatedColumns = updatedBoard.columns.filter((column: any) => column.id !== id);
        updatedBoard.columns = updatedColumns;

        updateOpenedBoard(updatedBoard);
    }

    function editColumnHandler(): void {
        const updatedBoard = deepCopy(openedBoard);

        const updatedColumns = updatedBoard.columns.map((column: any) => {
            if (column.id === props.id) {
                column.title = columntitle;
            }
            return column;
        });

        updatedBoard.columns = updatedColumns;

        updateOpenedBoard(updatedBoard);
        setEditColumn(false);

    }



    return (
        <div className="bg-[#F1EFFA] w-1/3 rounded-md p-4 my-6 min-w-[30%]">
            <div className="flex justify-between">
                {editColumn ? <input type="text" name='boardName' value={columntitle} placeholder="column title" className="p-2 bg-white rounded-md outline-none" onChange={(e) => setColumnTitle(e.target.value)} onBlur={editColumnHandler} /> : <span className='text-[#361F7A] font-bold text-lg'>{props.columnTitle}</span>}
                <div className='flex gap-2'>
                    <MdEdit className='cursor-pointer' onClick={() => {
                        // updateModalBtnContent("Edit column");
                        // updateModalState(true);
                        setEditColumn(true);
                    }} />
                    <MdDelete className='cursor-pointer' onClick={() => deleteColumnHandler(props.id)} />
                </div>
            </div>
            {props.items.map((item) => {
                return <ItemCard name={item.name} id={item.id} description={item.description} dueDate={item.dueDate} />
            })}
            <div className='bg-[#361F7A] text-white rounded-md p-2 text-center my-4 cursor-pointer' onClick={() => {
                updateModalBtnContent("Add Item");
                updateCurrentColumnId(props.id);
                updateModalState(true);
            }}>
                + Add Item
            </div>
        </div>
    )
}

export default Column;