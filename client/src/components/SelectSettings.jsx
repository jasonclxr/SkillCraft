import React, { useContext, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const sumValues = (obj) => {
    let total = 0;
    for (const x in obj) {
        total += parseInt(obj[x]);
    }
    return total;
}

const SelectSettings = () => {
    const [value, setValue] = useState({ agility: 0, stealth: 0, survivability: 0, magic: 0, signs: 0 });
    const MAX_TOTAL = 100;
    let left = MAX_TOTAL - sumValues(value);
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const calculateSliders = (e, key) => {
        setValue({ ...value, [key]: e.target.value })
    };

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={1}>
                    Available Points
                </Form.Label>
                <Col sm="auto">
                    <Form.Control type="number" />
                </Col>
            </Form.Group>
            {Object.keys(value).map((key, index) => {
                return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                        <Form.Label column sm={1}>
                            {key}
                        </Form.Label>
                        <Col sm="auto">
                            <Form.Range value={value[key]} onChange={e => calculateSliders(e, key)} min={0} max={100} />
                        </Col>
                        <Col>
                            {value[key]} / {left}
                        </Col>
                    </Form.Group>);
            })}

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 1 }}>
                    <Button type="submit" onClick={e => handleSubmit(e)}>Sign in</Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default SelectSettings;
