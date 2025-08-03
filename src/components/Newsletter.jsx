const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper">
      <div className="newsletter">
        <div className="container-points">
          <img src="icons/points-mini.svg" alt="points" />
        </div>
        <div className="info">
          <h2 className="title">Newsletter</h2>
          <p className="description">
            Be the first to hear about deals, offers and upcoming collections.
          </p>
        </div>
        <form className="entry-field" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter your email"
            required
          />
          <div className="button-wrapper">
            <button type="submit" className="button">Subscribe</button>
            <div className="vertical-line"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
