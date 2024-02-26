import React from 'react';
import Button from 'react-bootstrap/Button';

interface CategoryButtonProps {
    category: string;
    onCategoryClick: (category: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onCategoryClick }) => {
    return (
        <Button className="btn m-1" onClick={() => onCategoryClick(category)}>
            {category}
        </Button>
    );
}

export default CategoryButton;
