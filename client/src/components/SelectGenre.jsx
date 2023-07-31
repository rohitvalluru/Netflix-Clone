import React from 'react';

const SelectGenre = ({ genres, type, setSelectedGenre }) => { // Accept setSelectedGenre prop
    return (
        <select className='rounded-md bg-blue-400' onChange={(e) => {
            setSelectedGenre(e.target.value); // Use the setSelectedGenre prop to set the selected genre.
        }}>
            {genres.map((genre) => {
                return (<option value={genre.id} key={genre.id} className='bg-gray-300 text-lg font-semibold'>{genre.name}</option>);
            })}
        </select>
    );
}

export default SelectGenre;


