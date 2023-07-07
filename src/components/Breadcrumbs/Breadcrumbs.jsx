import React, { useEffect, useState } from 'react';
import classes from './breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
const Breadcrumbs = ({ deviceTitle }) => {
  const location = useLocation();
  const [paths, setPaths] = useState();

  useEffect(() => {
    setPaths(location.pathname.split('/'));
    if (deviceTitle) {
      let newPaths = location.pathname.split('/');
      newPaths.pop();
      setPaths([...newPaths, deviceTitle]);
    }
  }, [location, deviceTitle]);

  const renderCrumbs = () => {
    let currentLink = '';
    return paths.map((path, i) => {
      currentLink += `${path}/`;
      if (currentLink === '/') {
        return undefined;
      }
      return (
        <React.Fragment key={i}>
          <Link
            to={i === paths.length - 1 ? undefined : currentLink.slice(0, currentLink.length - 1)}
            className={[
              classes.breadcrumb,
              i === paths.length - 1 ? classes.current : undefined,
            ].join(' ')}>
            {path}
          </Link>
          <div className={classes.circle}></div>
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <div className="container">
        <div className={classes.breadcrumbs}>
          <div className={classes.circle}></div>
          <Link to={'/'} className={classes.breadcrumb}>
            Home
          </Link>
          <div className={classes.circle}></div>
          {paths && renderCrumbs()}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
