import { useContext } from 'react';
import Link from 'next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
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

type Props = {
  id: Number;
  boardName: String;
  boardDescription: String;
  sno: number;
}

const BoardListItem = (props: Props) => {

  const { boardsData,
    currentBoardName,
    currentDescriptionName,
    showModal,
    modalBtnContent,
    updateBoardsData,
    updateCurrentBoardName,
    updateCurrentDescription,
    updateModalState,
    updateModalBtnContent, updateCurrentBoardId } = useContext(boardsContext)

  function deleteBoardHandler(id: Number): void {


    const newData = boardsData?.filter((el) => el.id !== id);
    if (newData) updateBoardsData(newData);

  }

  function editBoardHandler(): void {
    const currentBoard = boardsData?.find((board) => board.id === props.id);

    if (currentBoard) {
      updateCurrentBoardName(currentBoard.name);
      updateCurrentDescription(currentBoard.description);
      updateCurrentBoardId(currentBoard.id)
      updateModalBtnContent('Edit');
      updateModalState(true);
    }

  }


  return (
    <li className='flex justify-between py-2 px-4 mx-2 rounded-md border-b-2 border-[#F1EFFA] hover:bg-[#F1EFFA]'>
      <span className='w-1/3 text-start'>{`${props.sno}`}</span>
      <span className='w-1/3 text-start'>{props.boardName}</span>
      <span className='w-1/3 text-start'>{props.boardDescription}</span>
      <div className='w-1/3 text-center flex justify-end gap-2 text-[#361F7A]'>
        <Link href={`/board/${props.id}`}><AiFillEye className='cursor-pointer' /></Link>
        <MdEdit className='cursor-pointer' onClick={() => editBoardHandler()} />
        <MdDelete className='cursor-pointer' onClick={() => deleteBoardHandler(props.id)} />
      </div>
    </li>
  )
}

export default BoardListItem;