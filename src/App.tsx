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
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };


    const visibleItems = items.filter(item => {
        const inCurrentCategory = currentCategory === 'Minden' || item.category === currentCategory;
        const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return inCurrentCategory && matchesSearchQuery;
    });

    const visibleSearch = items.length>0;


    return (
        <div className="container d-flex flex-column align-items-center justify-content-center"
             style={{height: '100vh'}}>
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

            {visibleSearch && (
                <input
                    className="m-2"
                    type="text"
                    placeholder="Keresés"
                    value={searchQuery}

                    onChange={handleSearchChange}/>
            )}

            {showNewItemForm && (
                <NewItemForm onNewItemSubmit={handleNewItemSubmit}/>
            )}

            {!showNewItemForm && (
                <ItemList
                    items={visibleItems}
                    onDeleteItem={handleDeleteItem}
                />
            )}
        </div>
    );
}

export default App;
