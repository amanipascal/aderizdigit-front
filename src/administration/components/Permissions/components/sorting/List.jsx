import React, { useState, useCallback } from 'react'
import { ListItem } from './ListItem'
// import { listStyle as style } from './style'

const PETS = [
    { id: 1, name: 'dog' },
    { id: 2, name: 'cat' },
    { id: 3, name: 'fish' },
    { id: 4, name: 'hamster' },
]

const List = () => {
    const [pets, setPets] = useState(PETS)

    const movePetListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = pets[dragIndex]
            const hoverItem = pets[hoverIndex]
            // Swap places of dragItem and hoverItem in the pets array
            setPets(pets => {
                const updatedPets = [...pets]
                updatedPets[dragIndex] = hoverItem
                updatedPets[hoverIndex] = dragItem
                return updatedPets
            })
        },
        [pets],
    )

 return (
        <div >{pets.map((pet, index) => (
            <ListItem
                key={pet.id}
                index={index}
                text={pet.name}
                moveListItem={movePetListItem}
            />
        ))}
        </div>
    )
}

export default List