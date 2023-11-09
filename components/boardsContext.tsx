"use client";
import React, { createContext, useState } from 'react';

type Items = {
    name: String;
    description: String;
    dueDate: String;
}

type Columns = {
    id: Number;
    title: String;
    items: Items[];
}

type BoardsData = {
    id: Number
    name: String;
    description: String;
    columns: Columns[]
}

type boardsContextType = {
    boardsData: BoardsData[] | null;
    openedBoard: BoardsData | null;
    currentBoardId: Number;
    currentColumnId: Number;
    currentBoardName: String;
    currentDescriptionName: String;
    showModal: boolean;
    modalBtnContent: String;
    updateBoardsData: (val: BoardsData[]) => void;
    updateCurrentBoardName: (val: String) => void;
    updateCurrentDescription: (val: String) => void;
    updateModalState: (val: boolean) => void;
    updateModalBtnContent: (val: String) => void;
    updateCurrentBoardId: (val: Number) => void;
    updateCurrentColumnId: (val: Number) => void;
    updateOpenedBoard: (val: BoardsData) => void;
};

const boardsDefaultValues: boardsContextType = {
    boardsData: [],
    openedBoard: null,
    currentBoardId: 1,
    currentColumnId: 1,
    currentBoardName: '',
    currentDescriptionName: '',
    showModal: false,
    modalBtnContent: 'Add',
    updateBoardsData: (val) => { },
    updateCurrentBoardName: (val: String) => { },
    updateCurrentDescription: (val: String) => { },
    updateModalState: (val: boolean) => { },
    updateModalBtnContent: (val: String) => { },
    updateCurrentBoardId: (val: Number) => { },
    updateOpenedBoard: (val: BoardsData) => { },
    updateCurrentColumnId: (val: Number) => { },
};

export const boardsContext = createContext<boardsContextType>(boardsDefaultValues);



type Props = {
    children: React.ReactNode;
};

export function boardsProvider({ children }: Props) {
    const [boardsData, setBoardsData] = useState<BoardsData[]>([]);
    const [currentBoardName, setCurrentBoardName] = useState<String>('');
    const [currentDescriptionName, setCurrentDescriptionName] = useState<String>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalBtnContent, setModalBtnContent] = useState<String>('Add');
    const [currentBoardId, setCurrentBoardId] = useState<Number>(1);
    const [currentColumnId, setCurrentColumnId] = useState<Number>(1);
    const [openedBoard, setOpenedBoard] = useState<BoardsData>({
        id: 1,
        name: '',
        description: '',
        columns: []
    });

    const updateBoardsData = (val: BoardsData[]): void => {
        setBoardsData(val);
    };

    const updateCurrentBoardName = (val: String): void => {
        setCurrentBoardName(val);
    };

    const updateCurrentDescription = (val: String): void => {
        setCurrentDescriptionName(val);
    };

    const updateModalState = (val: boolean): void => {
        setShowModal(val);
    }

    const updateModalBtnContent = (val: String): void => {
        setModalBtnContent(val);
    }

    const updateCurrentBoardId = (val: Number): void => {
        setCurrentBoardId(val);
    }

    const updateCurrentColumnId = (val: Number): void => {
        setCurrentColumnId(val);
    }

    const updateOpenedBoard = (val: BoardsData): void => {
        setOpenedBoard(val);
    }

    const value = {
        boardsData,
        openedBoard,
        currentBoardName,
        currentDescriptionName,
        showModal,
        modalBtnContent,
        currentBoardId,
        currentColumnId,
        updateBoardsData,
        updateCurrentBoardName,
        updateCurrentDescription,
        updateModalState,
        updateModalBtnContent,
        updateCurrentBoardId,
        updateOpenedBoard,
        updateCurrentColumnId
    };

    return (
        <>
            <boardsContext.Provider value={value}>
                {children}
            </boardsContext.Provider>
        </>
    );
}
