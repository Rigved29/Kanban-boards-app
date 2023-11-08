import Link from 'next/link';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';


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
  setBoardsData: React.Dispatch<React.SetStateAction<BoardsData[] | null>>,
  setBoardName: React.Dispatch<React.SetStateAction<string>>;
  setBoardDescription: React.Dispatch<React.SetStateAction<string>>
}

const BoardListItem = (props: Props) => {

  function deleteBoardHandler(id: Number): void {

    console.log('listItem36', props);

    props.setBoardsData((prevState) => {
      if (prevState) {
        const newData = prevState.filter((el) => el.id !== id);
        return newData;
      } else {
        return prevState;
      }

    })
  }




  return (
    <li className='flex justify-between py-2 px-4 mx-2 rounded-md border-b-2 border-[#F1EFFA] hover:bg-[#F1EFFA]'>
      <span className='w-1/3 text-start'>{`${props.sno}`}</span>
      <span className='w-1/3 text-start'>{props.boardName}</span>
      <span className='w-1/3 text-start'>{props.boardDescription}</span>
      <div className='w-1/3 text-center flex justify-end gap-2 text-[#361F7A]'>
        <Link href={`/board/${props.id}`}><AiFillEye className='cursor-pointer' /></Link>
        <MdEdit className='cursor-pointer' />
        <MdDelete className='cursor-pointer' onClick={() => deleteBoardHandler(props.id)} />
      </div>
    </li>
  )
}

export default BoardListItem;