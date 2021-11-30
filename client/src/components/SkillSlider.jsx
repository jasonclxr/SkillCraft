import React, { useContext, useState } from 'react';

import { Form, Col } from 'react-bootstrap';

const SkillSlider = (props) => {
    const [value, setValue] = useState(0);
    return (
        <>
            <Form.Label column sm={1}>
                {props.label}
            </Form.Label>
            <Col sm="auto">
                <Form.Range value={value} onChange={e => setValue(e.target.value)}  min={0} max={100}/>
            </Col>
            <Col>
                {value}
            </Col>
        </>
    )
};

export default SkillSlider;
