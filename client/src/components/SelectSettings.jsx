import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Spinner, Col, Row } from 'react-bootstrap';

import { generateSkills, createTree } from '../mcts.js';
import { AppContext } from '../context/AppContext';
import { capitalize } from 'lodash';


const convertSkillsToRepresentation = (skills) => {
    let combats = [];
    let signs = [];
    let alchemy = [];
    let generals = [];
    for (let [, value] of skills) {
        if (value.points === 0)
            continue;
        switch (value.branch) {
            case "combat":
                combats.push(value);
                break;
            case "signs":
                signs.push(value);
                break;
            case "alchemy":
                alchemy.push(value);
                break;
            case "general":
                generals.push(value);
                break;
            default:
                console.log("WHATS THIS", value);
                break;
        }
    }
    return { combat: combats, sign: signs, alchemy: alchemy, general: generals };
}

const SelectSettings = () => {
    const [value, setValue] = useState({ healing: 16, close_range: 16, ranged: 16, adrenaline: 16, defense: 16, unique: 16 });
    const [startTree, setTree] = useState(() => {
        const initialTree = createTree();
        return initialTree;
    });
    const [pointCount, setPointCount] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const { setSelectedSkills } = useContext(AppContext);

    useEffect(() => {
        if (isLoading) {
            console.log(startTree);
            const tree = generateSkills(value, pointCount, startTree);
            const selected_skills = convertSkillsToRepresentation(tree.skills);
            setSelectedSkills(selected_skills);
            setLoading(false);
        }
    }, [isLoading, pointCount, setSelectedSkills, startTree, value.healing, value.close_range, value.ranged, value.adrenaline, value.defense, value.unique]);


    const MAX_SKILLS = 96;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
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
                            {capitalize(key)}
                        </Form.Label>
                        <Col>
                            <Form.Range value={value[key]} onChange={e => calculateSliders(e, key)} min={0} max={MAX_SKILLS} />
                        </Col>
                        <Col>
                            {value[key]}
                        </Col>
                    </Form.Group>);
            })}

            <Form.Group as={Row} className="mb-3">
                <Col>
                    <Button type="submit" onClick={!isLoading ? e => handleSubmit(e) : null} disabled={isLoading}>

                        {isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : null}
                        {isLoading ? ' Loading…' : 'Compute'}
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default SelectSettings;
