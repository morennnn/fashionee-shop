const ColorFilter = ({
  availableColors,
  draftColors,
  setDraftColors,
  showColors,
  setShowColors,
}) => {
  const toggleColor = (value) => {
    setDraftColors((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <div className="sidebar-item">
        <div className="sidebar-title">Colors</div>
        <div className={`sidebar-content collapsible ${showColors ? 'expanded' : 'collapsed'}`}>
          <div className="colors">
            {availableColors.map((color) => (
              <div className="color" key={color}>
                <input
                  type="checkbox"
                  className="color-checkbox"
                  id={color}
                  value={color}
                  checked={draftColors.includes(color)}
                  onChange={() => toggleColor(color)}
                />
                <label htmlFor={color} className="color-name">
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="deploy-toggle"
        onClick={() => setShowColors((prev) => !prev)}
      >
        <img
          src="/icons/chevron-down.svg"
          alt="chevron"
          className={`deploy-icon ${showColors ? '' : 'rotated'}`}
        />
        <span className="deploy-text">Deploy</span>
      </div>
    </>
  );
};

export default ColorFilter;
