import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../../containers/List';

import './styles.scss';

const ListsContainer = ({
  link, lists, placeholder, listErrorMessage, getLists, handleOnDragEnd,
}) => (
  <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="container" direction="horizontal" type="listsContainer">
      {(provided) => (
        <div className="listsContainer" ref={provided.innerRef} {...provided.droppableProps}>
          {listErrorMessage && (
          <p className="listsContainer-noListMessage">{listErrorMessage}</p>
          )}
          {lists && lists.map((list, index) => (
            <List key={list.id} list={list} listIndex={index} getLists={getLists} lists={lists} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>

);
export default ListsContainer;
