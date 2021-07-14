import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import classNames from 'classnames';
import axios from '../../api';
import './styles.scss';

const dayjs = require('dayjs');

const Container = styled.div`
  background-color: ${(props) => (props.isDragging ? '#222' : 'transparent')};
  z-index: ${(props) => (props.isDragging ? '100' : 'inherit')};
`;

const LinkBox = ({
  link, setLinkDeleted, index, getLists,
}) => {
  const [linkLoading, setLinkLoading] = useState(false);

  const deleteLink = () => {
    setLinkLoading(true);
    setTimeout(() => {
      axios.delete(`links/${link.id}`)
        .then((result) => {
          setLinkDeleted(true);
          getLists();
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
    setTimeout(() => {
      setLinkLoading(false);
      setLinkDeleted(false);
    }, 2000);
  };

  return (

    <Draggable draggableId={`link${link.id.toString()}`} index={index}>
      {(provided, snapshot) => (
        <Container
          className={classNames('link-box', { 'link-box--loading': linkLoading })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <a href={link.url} target="_blank" rel="noreferrer" className="link-box__a">
            <div className="link-box__div-image">
              <img src={link.image} alt={link.title} className="link-box__image" />
            </div>
            <div className="link-box__text">
              <p className="link-box__text-p link-box__text-p--title">
                {link.title}
              </p>
              <p className="link-box__text-p link-box__text-p--description">
                {link.description}
              </p>
              <p className="link-box__text-p link-box__text-p--source">
                {link.site_name}
              </p>
              <p className="link-box__text-p link-box__text-p--date">
                {dayjs(link.updated_at).format('DD-MMM-YYYY H:mm')}
              </p>
            </div>
          </a>
          <div className="link-box__delete" onClick={deleteLink}>
            <p>x</p>
          </div>
        </Container>
      )}
    </Draggable>

  );
};
export default LinkBox;
