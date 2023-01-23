import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Avatar, ListItemAvatar, ListSubheader, TextField } from '@mui/material';
import logoMonday from './logo/logo_monday.png'
import logoTableau from './logo/logo_tableau.png'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});


const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

const SortedCompList = ({Cible}) => {

  const [items, setItems] = React.useState([])

  // React.useEffect(() => {
  //   // InitializeMenuWsc()
  // }, [Cible])

  React.useEffect(() => {
    console.log(Cible)
    if (Cible && !!Cible.wscompList.length) {
      setItems([
        ...Cible.wscompList.map(item => {
          return {
            ...item,
            id: item._id
          }
        })
      ])
    }
  }, [Cible])



  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const new_items = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(new_items)
  }
  
    
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
      {
          (provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      {item.lib}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )
      }
      </Droppable>
    </DragDropContext>
  )
}

export default SortedCompList

/**
 *  <List dense sx={{
       width: '100%', 
       bgcolor: 'background.paper',
       position: 'relative',
       overflow: 'auto',
       maxHeight: 500
       }}
       subheader={
       <ListSubheader>
        Settings
       </ListSubheader>}
       >
      {(compos && compos.length)&& compos.map((item, index) => {
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar ${item.lib}`}
                  src={ item.origin_tool == 'monday' ?  `${logoMonday}` : `${logoTableau}` }
                />
              </ListItemAvatar>
              <ListItemText id={item.lib} primary={item.lib} />
              <Checkbox
                edge="end"
                onChange={handleToggle(item)}
                checked={checked.indexOf(item) !== -1}
                inputProps={{ 'aria-labelledby': item.lib }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
 */