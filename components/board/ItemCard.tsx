import { useState, useContext, useEffect } from "react";
import { boardsContext } from "../boardsContext";
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { MdEdit, MdDelete } from 'react-icons/md';


type Props = {
    id: Number;
    name: string;
    description: String;
    dueDate?: String;
}

const ItemCard = (props: Props) => {

    const [editItem, setEditItem] = useState(false);
    const [name, setName] = useState<any>(props.name);
    const [description, setDescription] = useState<any>(props.description);

    const { boardsData,
        openedBoard,
        currentBoardId,
        currentColumnId,
        currentBoardName,
        currentDescriptionName,
        showModal,
        modalBtnContent,
        updateBoardsData,
        updateCurrentBoardName,
        updateCurrentDescription,
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



    function deleteItemHandler(id: Number): void {


        if (openedBoard) {

            const updatedBoard = deepCopy(openedBoard);



            const updatedColumns = updatedBoard.columns.filter((column: any) => {
                if (column.id === currentColumnId) {
                    const updatedItems = column.items.filter((item: any) => item.id !== id);
                    column.items = [...updatedItems];
                }

                return column;
            })


            updatedBoard.columns = [...updatedColumns];
            updateOpenedBoard(updatedBoard);
        }


    }

    const editItemHandler = (propertyToUpdate: String): void => {
        const updatedBoard = deepCopy(openedBoard);

        const updatedColumns = updatedBoard.columns.map((column: any) => {
            if (column.id === currentColumnId) {
                const itemToUpdate = column.items.find((item: any) => item.id === props.id);
                if (propertyToUpdate === 'name') {
                    itemToUpdate.name = name;
                } else if (propertyToUpdate === 'description') {
                    itemToUpdate.description = description;
                }

            }
            return column;
        });

        updatedBoard.columns = updatedColumns;

        updateOpenedBoard(updatedBoard);
        setEditItem(false);

    }


    return (
        <div className="bg-white rounded-md p-4 my-4">
            <div className="flex justify-between border-b-2 mb-2">
                {editItem ? <input type="text" name='desciption' value={name} placeholder="item description" className="p-2 bg-[#F1EFFA] rounded-md outline-none" onChange={(e) => setName(e.target.value)} onBlur={() => editItemHandler("name")} /> : <span className='font-semibold text-lg'>{props.name}</span>}
                <div className='flex gap-2'>
                    <MdEdit className='cursor-pointer' onClick={() => setEditItem(true)} />
                    <MdDelete className='cursor-pointer' onClick={() => deleteItemHandler(props.id)} />
                </div>
            </div>
            {editItem ? <input type="text" name='desciption' value={description} placeholder="item description" className="p-2 bg-[#F1EFFA] rounded-md outline-none" onChange={(e) => setDescription(e.target.value)} onBlur={() => editItemHandler("description")} /> : <p>{props.description}</p>}
            <p>{props.dueDate}</p>
        </div>
    )
}

export default ItemCard;