import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideCloser(ref, propFunction) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert('You clicked outside of me!');
        propFunction();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideCloser({ children, propFunction }) {
  const wrapperRef = useRef(null);

  useOutsideCloser(wrapperRef, propFunction);

  return <div ref={wrapperRef}>{children}</div>;
}

OutsideCloser.propTypes = {
  children: PropTypes.element.isRequired,
  propFunction: PropTypes.func.isRequired,
};

export default OutsideCloser;
