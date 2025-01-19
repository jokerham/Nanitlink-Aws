import React from 'react';

const AddForm: React.FC = () => {
    return (
        <form>
            <h2>Add Menu</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddForm;