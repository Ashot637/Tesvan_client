import React, { useEffect, useState } from 'react';
import classes from './breadcrumbs.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from '../../helpers/axios';
const Breadcrumbs = ({ deviceTitle }) => {
  const location = useLocation();
  const [paths, setPaths] = useState();
  const { id } = useParams();
  const [title, setTitle] = useState(deviceTitle);

  useEffect(() => {
    setPaths(location.pathname.split('/'));
    if (deviceTitle) {
      let newPaths = location.pathname.split('/');
      setPaths(newPaths);
    }
    if (id && !deviceTitle) {
      axios.get('/device/' + id).then(({ data }) => {
        let newPaths = location.pathname.split('/');
        setTitle(data.title);
        setPaths(newPaths);
      });
    }
  }, [location, deviceTitle]);

  const renderCrumbs = () => {
    let currentLink = '';
    return paths.map((path, i) => {
      if ([...path.split(' ')].length > 1) {
        currentLink += `${id}/`;
      } else {
        currentLink += `${path}/`;
      }
      if (currentLink === '/') {
        return undefined;
      }

      const url = i === paths.length - 1 ? undefined : currentLink.slice(0, currentLink.length - 1);

      return (
        <React.Fragment key={i}>
          <Link
            to={url}
            className={[
              classes.breadcrumb,
              i === paths.length - 1 ? classes.current : undefined,
            ].join(' ')}>
            {path == id ? title : path}
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
