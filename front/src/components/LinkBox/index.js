import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import classNames from 'classnames';
import axios from '../../api';
import './styles.scss';
import favicon from '../../assets/favicon_io/android-chrome-192x192.png';

const dayjs = require('dayjs');

const Container = styled.div`
  background-color: ${(props) => (props.isDragging ? '#222' : 'transparent')};
  box-shadow: ${(props) => (props.isDragging ? 'inset 3px 3px 5px rgb(90, 90, 90), inset -1px -1px 5px rgb(107, 107, 107);' : 'inset 1px 1px 5px rgb(107, 107, 107), inset -1px -1px 5px rgb(24, 24, 24);')};
  ${'' /* background: ${(props) => (props.isDragging ? 'radial-gradient(rgba(0, 0, 0) 50%, rgba(100, 100, 100));' : 'inherit')}; */}
  ${'' /* background: ${(props) => (props.isDragging ? 'radial-gradient(rgba(0, 0, 0) 50%, rgba(100, 100, 100))' : 'inherit')}; */}
`;

const A = styled.a`
  box-shadow: ${(props) => (props.isDragging ? 'inset 3px 3px 5px rgb(90, 90, 90), inset -1px -1px 5px rgb(107, 107, 107);' : 'inset 1px 1px 5px rgb(107, 107, 107), inset -1px -1px 5px rgb(24, 24, 24);')};
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

  const addDefaultSrc = (event) => {
    event.target.src = favicon;
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
          <A isDragging={snapshot.isDragging} href={link.url} target="_blank" rel="noreferrer" className="link-box__a">
            <div className="link-box__div-image">
              <img onError={addDefaultSrc} src={link.image} alt={link.title} className="link-box__image" />
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
                {dayjs(link.created_at).format('D MMMM YY - H:mm')}
              </p>
            </div>
          </A>
          <div className="link-box__delete" onClick={deleteLink}>
            <p>x</p>
          </div>
        </Container>
      )}
    </Draggable>
  );
};

LinkBox.propTypes = {
  link: PropTypes.object,
  setLinkDeleted: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  getLists: PropTypes.func.isRequired,
};

LinkBox.defaultProps = {
  link: {},
};

export default LinkBox;
