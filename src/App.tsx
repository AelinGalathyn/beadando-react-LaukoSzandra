import React, { useState } from 'react';
import CategoryButton from './CategoryButton';
import ItemList from './ItemList';
import NewItemForm, {NewItemFormData} from './NewItemForm';

interface Item {
    id: number;
    name: string;
    category: string;
}

const App: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [showNewItemForm, setShowNewItemForm] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('all');


    const handleNewItemSubmit = (newItemData: NewItemFormData) => {
        const id = Math.random()*100;

        const newItem: Item = {
            ...newItemData,
            id,
        };

        setItems(currentItems => {
            const newItems = [...currentItems, newItem];

            if (currentItems.length === 0 && !categories.includes('Minden')) {
                setCategories(['Minden', newItem.category]);
            }
            else if (newItem.category && !categories.includes(newItem.category)) {
                setCategories(currentCategories => [...currentCategories, newItem.category]);
            }

            return newItems;
        });

        setShowNewItemForm(false);
        setCurrentCategory('Minden');
    };


    const toggleNewItemForm = () => {
        setShowNewItemForm(prev => !prev);
    };

    const handleDeleteItem = (itemId: number) => {
        const itemCategory = items.find(item => item.id === itemId)?.category;

        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);

        if (itemCategory) {
            const isCategoryEmpty = !updatedItems.some(item => item.category === itemCategory);

            if (isCategoryEmpty) {
                setCategories(categories.filter(category => category !== itemCategory));
            }
        }
    };


    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{height: '100vh'}}>
            <div>
                {categories.map((category) => (
                    <CategoryButton
                        key={category}
                        category={category}
                        onCategoryClick={() => setCurrentCategory(category)}
                    />
                ))}
                <button className="btn btn-primary ms-2" onClick={toggleNewItemForm}>Új</button>
            </div>

            {showNewItemForm && (
                <NewItemForm onNewItemSubmit={handleNewItemSubmit}/>
            )}

            {!showNewItemForm && (
                <ItemList
                    items={currentCategory === 'Minden' ? items : items.filter(item => item.category === currentCategory)}
                    onDeleteItem={handleDeleteItem}
                />
            )}
        </div>
    );
}

export default App;
