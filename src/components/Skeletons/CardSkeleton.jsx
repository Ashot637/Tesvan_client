import React from 'react';
import classes from './skeletons.module.scss';

const CardSkeleton = () => {
  return <div className={[classes.skeleton, classes.card].join(' ')}></div>;
};

export default CardSkeleton;
