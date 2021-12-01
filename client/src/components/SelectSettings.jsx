import React, { useContext, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

import { createTree, Simulator, MCTS } from '../mcts.js';

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
        console.log("RUNNING MCTS HERE");

        const tree = createTree();
        const simulator = new Simulator();
        const mcts = new MCTS(100, 2, simulator);
        mcts.rollout(tree);
        console.log(tree);
    };

    const calculateMaxID = (current_id) => {
        const maxID = Object.entries(value).reduce((a, b) => {
            if (a[0] === current_id) return b;
            if (b[0] === current_id) return a;
            return a[1] > b[1] ? a : b
        })[0];
        return maxID;
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
                <Form.Label column sm={2}>
                    Available Points
                </Form.Label>
                <Col>
                    <Form.Control type="number" value={pointCount} onChange={e => setPointCount(parseInt(e.target.value))} />
                </Col>
                <Col>
                    {pointCount}
                </Col>
            </Form.Group>
            {Object.keys(value).map((key, index) => {
                return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                        <Form.Label column sm={2}>
                            {key}
                        </Form.Label>
                        <Col>
                            <Form.Range value={value[key]} onChange={e => calculateSliders(e, key)} min={0} max={100} />
                        </Col>
                        <Col>
                            {value[key]}
                        </Col>
                    </Form.Group>);
            })}

            <Form.Group as={Row} className="mb-3">
                <Col>
                    <Button type="submit" onClick={e => handleSubmit(e)}>Sign in</Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default SelectSettings;
