import React from 'react';

const EditForm: React.FC<{ node: any }> = ({ node }) => {
    return (
        <form>
            <h2>Edit Menu: {node.name}</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" defaultValue={node.name} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default EditForm;