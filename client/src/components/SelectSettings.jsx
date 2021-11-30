import React, { useContext, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const sumValues = (obj) => {
    let total = 0;
    for (const x in obj) {
        total += obj[x];
    }
    return total;
}

const SelectSettings = () => {
    const [value, setValue] = useState({ agility: 20, stealth: 20, survivability: 20, magic: 20, signs: 20 });
    const [pointCount, setPointCount] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const calculateMaxID = (current_id) => {
        var maxValue;
        var maxId;
        for (let v in value) {
            var val = value[v];
            var id = v;
            if (id == current_id) {
                continue;
            }
            if (maxValue === undefined || maxValue < val) {
                maxValue = val;
                maxId = id;
            }
        }
        return maxId;
    }

    const calculateSliders = (e, key) => {
        let nextMax = calculateMaxID(key);
        let newValue = parseInt(e.target.value);
        let difference = value[key] - newValue;
        setValue({ ...value, [key]: newValue, [nextMax]: value[nextMax] + difference });
    };

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={1}>
                    Available Points
                </Form.Label>
                <Col sm="auto">
                    <Form.Control type="number" value={pointCount} onChange={e => setPointCount(parseInt(e.target.value))} />
                </Col>
                <Col sm="auto">
                    {pointCount}
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
                            {value[key]}
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