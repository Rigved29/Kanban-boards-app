import ItemCard from './ItemCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { MdEdit, MdDelete } from 'react-icons/md';

type Props = {
    columnTitle: string;
    items: any[];
}

const Column = (props: Props) => {


    return (
        <div className="bg-[#F1EFFA] w-1/3 rounded-md p-4 my-6">
            <div className="flex justify-between">
                <span className='text-[#361F7A] font-bold text-lg'>{props.columnTitle}</span>
                <div className='flex gap-2'>
                    <MdEdit className='cursor-pointer' />
                    <MdDelete className='cursor-pointer' />
                </div>
            </div>
            {props.items.map((item) => {
                return <ItemCard name={item.name} id={item.id} description={item.description} dueDate={item.dueDate} />
            })}
            <div className='bg-[#361F7A] text-white rounded-md p-2 text-center my-4 cursor-pointer'>
                + Add Item
            </div>
        </div>
    )
}

export default Column;