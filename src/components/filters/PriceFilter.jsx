import ReactSlider from 'react-slider';

const PriceFilter = ({ draftPriceRange, setDraftPriceRange }) => {
  return (
    <div className="sidebar-item">
      <div className="sidebar-title">Price</div>
      <div className="sidebar-content">
        <div className="price-bar">
          <ReactSlider
            className="range-slider"
            thumbClassName="thumb"
            trackClassName="track"
            min={0}
            max={221}
            value={draftPriceRange}
            onChange={setDraftPriceRange}
            pearling
            minDistance={10}
            renderThumb={(props, state) => (
              <div {...props} className="thumb">
                <div className="thumb-label">${state.valueNow.toFixed(2)}</div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
