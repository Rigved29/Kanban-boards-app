import { BsFillPlusCircleFill } from 'react-icons/bs';
import { MdEdit, MdDelete } from 'react-icons/md';

type Props = {
    id: Number;
    name: string;
    description: String;
    dueDate?: String;
}

const ItemCard = (props: Props) => {


    return (
        <div className="bg-white rounded-md p-4 my-4">
            <div className="flex justify-between border-b-2 mb-2">
                <span className='font-semibold text-lg'>{props.name}</span>
                <div className='flex gap-2'>
                    <MdEdit className='cursor-pointer' />
                    <MdDelete className='cursor-pointer' />
                </div>
            </div>
            <p>{props.description}</p>
            <p>{props.dueDate}</p>
        </div>
    )
}

export default ItemCard;