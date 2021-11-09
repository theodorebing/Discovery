import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../../containers/List';

import './styles.scss';

const ListsContainer = ({
  lists, listErrorMessage, getLists, handleOnDragEnd,
}) => (
  <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="container" direction="horizontal" type="listsContainer">
      {(provided) => (
        <div className="listsContainer" ref={provided.innerRef} {...provided.droppableProps}>
          {!listErrorMessage && (
            <div className="listsContainer-empty" />
          )}
          <div className="listsContainer-empty" />
          {listErrorMessage && (
          <p className="listsContainer-noListMessage">{listErrorMessage}</p>
          )}
          {lists && lists.map((list, index) => (
            <List key={list.id} list={list} listIndex={index} getLists={getLists} lists={lists} />
          ))}
          {provided.placeholder}
          <div className="listsContainer-empty" />
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

ListsContainer.propTypes = {
  lists: PropTypes.array,
  listErrorMessage: PropTypes.string,
  getLists: PropTypes.func.isRequired,
  handleOnDragEnd: PropTypes.func.isRequired,
};

ListsContainer.defaultProps = {
  lists: [],
  listErrorMessage: '',
};

export default ListsContainer;
