import React, { useState } from 'react';

export interface NewItemFormData {
    name: string;
    category: string;
}

interface NewItemFormProps {
    onNewItemSubmit: (newItem: NewItemFormData) => void;
}

const NewItemForm: React.FC<NewItemFormProps> = ({ onNewItemSubmit }) => {
    const [formData, setFormData] = useState<NewItemFormData>({ name: '', category: '' });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onNewItemSubmit(formData);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="w-50">
                <div className="mb-1">
                    <label htmlFor="name" className="form-label">Név:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="category" className="form-label">Kategória:</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Hozzáad</button>
            </form>
        </div>
    );
}

export default NewItemForm;