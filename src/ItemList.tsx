import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Item {
    id: number;
    name: string;
    category: string;
}

interface ItemListProps {
    items: Item[];
    onDeleteItem: (itemId: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDeleteItem }) => {
    const [confirmDeletion, setConfirmDeletion] = useState<Record<number, boolean>>({});

    const handleShowConfirmation = (id: number) => {
        setConfirmDeletion({ ...confirmDeletion, [id]: true });
    };

    const handleCancelDeletion = (id: number) => {
        const updatedConfirmDeletion = { ...confirmDeletion };
        delete updatedConfirmDeletion[id];
        setConfirmDeletion(updatedConfirmDeletion);
    };

    return (
        <div>
            <ul>
                {items.map(item => (
                    <li className="list-unstyled" key={item.id}>
                        {item.name} - {item.category}
                        {confirmDeletion[item.id] ? (
                            <>
                                <button className="m-2" onClick={() => handleCancelDeletion(item.id)}><FontAwesomeIcon icon={faTimes}/></button>
                                <button className="m-2" onClick={() => onDeleteItem(item.id)}><FontAwesomeIcon icon={faCheck}/></button>
                            </>
                        ) : (
                            <button className="m-2" onClick={() => handleShowConfirmation(item.id)}><FontAwesomeIcon icon={faTrash}/></button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
