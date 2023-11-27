import { useState, useRef, useEffect } from 'react';

export default function useClickOutside() {
  const [isShow, setIsShow] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (!ref.current?.contains(e.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    if (isShow) {
      document.body.addEventListener('click', handleClickOutside);
    } else {
      document.body.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [isShow]);

  return [ref, isShow, setIsShow];
}
