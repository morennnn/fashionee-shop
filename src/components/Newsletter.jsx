import React from 'react';

const Newsletter = () => {
  return (
    <div className="wrapper">
      <div className="newsletter">
        <div className="container-points">
          <img src="icons/points-mini.svg" alt="points" />
        </div>
        <div className="info">
          <div className="title">Newsletter</div>
          <div className="description">
            Be the first to hear about deals, offers and upcoming collections.
          </div>
        </div>
        <div className="entry-field">
          <input
            type="text"
            name="entry-field"
            className="input"
            placeholder="Enter your email"
          />
          <div className="button-wrapper">
            <button className="button">Subscribe</button>
            <div className="vertical-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
