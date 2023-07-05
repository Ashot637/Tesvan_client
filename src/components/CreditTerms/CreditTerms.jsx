import React from 'react';
import classes from './creditTerms.module.scss';

const CreditTerms = () => {
  return (
    <div className={classes.creditTerms}>
      <div className="container">
        <div className={classes.inner}>
          <div className={classes.terms}>
            <div className={classes.term}>
              <h3 className={classes.title}>PROVIDED CREDIT TERMS</h3>
              <ul className={classes.ul}>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime facere modi
                  tenetur voluptates animi similique. Cumque sint ut illum natus.
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime facere modi
                  tenetur voluptates animi similique. Cumque sint ut illum natus.
                </li>

                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime facere modi
                  tenetur voluptates animi similique. Cumque sint ut illum natus.
                </li>
              </ul>
            </div>
            <div className={classes.term}>
              <h3 className={classes.title}>PROVIDED CREDIT TERMS</h3>
              <ul className={classes.ul}>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime facere modi
                  tenetur voluptates animi similique. Cumque sint ut illum natus.
                </li>

                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime facere modi
                  tenetur voluptates animi similique. Cumque sint ut illum natus.
                </li>

                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime facere modi
                  tenetur voluptates animi similique. Cumque sint ut illum natus.
                </li>
              </ul>
            </div>
            <div className={classes.term}>
              <h3 className={classes.title}>PROVIDED CREDIT TERMS</h3>
              <ul className={classes.ul}>
                <li>Lorem, ipsum.</li>
                <li>Lorem, ipsum.</li>
                <li>Lorem, ipsum.</li>
                <li>Lorem, ipsum.</li>
                <li>Lorem, ipsum.</li>
                <li>Lorem, ipsum.</li>
              </ul>
            </div>
            <p className={classes.call}>For more infotmation you can call +374 91 75 19 00 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditTerms;
