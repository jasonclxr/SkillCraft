import React, { useContext, useState } from 'react';

const SkillSlider = (props) => {
    const [value, setValue] = useState(0);
    return (
        <>
            <label for="customRange1" className="col-sm-1 col-form-label">{props.label}</label>
            <div className="col-auto">
                <input id="customRange1" value={value} onChange={e => setValue(e.target.value)} type="range" className="form-range" min={0} max={100} />
            </div>
            <div className="col-auto">
                {value}
            </div>
        </>
    )
};

export default SkillSlider;
