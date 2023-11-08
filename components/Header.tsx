import React from "react";

type Props = {
    headTitle: string;
    btnContent?: String;
    onClickHandler?: any
}

const Header = (props: Props) => {

    return (
        <section className="py-2 px-6 mt-2 flex justify-between items-center border-b-2 border-[#361F7A]-400 font-sans text-[#361F7A] font-semibold">
            <p className="text-xl">{props.headTitle}</p>
            <button className="bg-[#361F7A] text-white rounded-md py-2 px-4" onClick={() => props.onClickHandler()}>
                {props.btnContent}
            </button>
        </section>
    )
}

export default Header;