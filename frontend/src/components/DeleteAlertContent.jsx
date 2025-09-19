import React from 'react'

const DeleteAlertContent = ({ content, onDelete }) => {
    return (
        <div className="p-5">
            <p className="text-[14px]">{content}</p>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteAlertContent