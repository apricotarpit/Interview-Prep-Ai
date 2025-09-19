import React from 'react'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'


const Input = ({ label, placeholder, type, value, onChange }) => {
    const [showPassward, setShowPassward] = useState(false);
    const toggleShowPassword = () => { 
        setShowPassward(!showPassward);
    };

    return (
        <div className='mb-5'>
            <label className='text-[13px] text-slate-800 mb-2'>{label}</label>
            <div className='flex items-center w-full rounded-md border border-slate-300 bg-white px-3 py-2 focus-within:border-amber-500 hover:border-amber-400 transition'>
                <input
                    type={
                        type == 'password' ? (showPassward ? 'text' : 'password') : type
                    }
                    placeholder={placeholder}
                    className='flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none'
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {type === 'password' && (
                    <>
                        {showPassward ? (
                            <FaRegEye
                                size={22}
                                className='text-slate-500 hover:text-amber-500 cursor-pointer transition'
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className='text-slate-400 hover:text-amber-500 cursor-pointer transition'
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
};

export default Input