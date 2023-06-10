import React, { useEffect, useState, useRef } from 'react';

const MultiSelect = (props) => {
    const [listValues, setListValues] = useState(props.entryValues);
    const [choosenValues, setChoosenValues] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const handleDelete = (e) => {
        const index = choosenValues.indexOf(e.target.dataset.value);
        const newChoosenValues = [...choosenValues.slice(0, index), ...choosenValues.slice(index + 1)];
        setListValues([...listValues, choosenValues[index]]);
        setChoosenValues(newChoosenValues);
        props.getValues(newChoosenValues);
    }

    const componentRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleAdd = (e) => {
        const index = listValues.indexOf(e.target.dataset.value);
        const newListValues = [...listValues.slice(0, index), ...listValues.slice(index + 1)];
        setChoosenValues([...choosenValues, listValues[index]]);
        setListValues(newListValues);
        props.getValues([...choosenValues, listValues[index]]);
    }
    return (
        <div className='relative w-full h-full' ref={componentRef}>
            <div className='flex w-full border rounded justify-between items-center'>
                <div className='py-1 px-3 flex flex-wrap gap-x-5 gap-y-2 w-full'>
                    {choosenValues.length === 0 && <span className='select-none text-slate-400'>Choose tags</span>}
                    {choosenValues.map((val, i) =>
                        <span key={i} className='bg-slate-200 p-1 rounded cursor-pointer select-none' onClick={handleDelete} data-value={val}>#{val}</span>
                    )}
                </div>
                <span className='h-full py-2 px-3' type='button' onClick={() => setIsOpen(!isOpen)}><i className="fa-solid fa-caret-down"></i></span>
            </div>
            {isOpen &&
                <div className={`flex flex-wrap gap-x-5 gap-y-2 min-h-[2ch] py-1 px-3 transition-all rounded-b absolute w-10 bg-white z-50 border-b border-x w-full py-3 shadow-lg`}>
                    {listValues.map((val, i) =>
                        <span key={i} className='bg-slate-200 p-1 rounded cursor-pointer select-none' onClick={handleAdd} data-value={val}>#{val}</span>
                    )}
                </div>
            }
        </div>
    );
}

export default MultiSelect;
