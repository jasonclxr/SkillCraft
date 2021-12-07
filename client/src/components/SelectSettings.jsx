import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Spinner, Col, Row } from 'react-bootstrap';

import { generateSkills, createTree } from '../mcts.js';
import { AppContext } from '../context/AppContext';
import { camelCase, startCase } from 'lodash';


const convertSkillsToRepresentation = (skills) => {
    let combats = [];
    let signs = [];
    let alchemy = [];
    let generals = [];
    for (let [, value] of skills) {
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
    const [startTree] = useState(() => {
        const initialTree = createTree();
        return initialTree;
    });
    const [pointCount, setPointCount] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const { setSelectedSkills } = useContext(AppContext);

    useEffect(() => {
        async function computeSkills() {
            await new Promise(r => setTimeout(r, 20));;
            const tree = generateSkills(value, pointCount, startTree);
            const selected_skills = convertSkillsToRepresentation(tree.skills);
            setSelectedSkills(selected_skills);
            setLoading(false);
        }
        if (isLoading) {
            computeSkills();
        }
    }, [isLoading, pointCount, setSelectedSkills, startTree, value, value.healing, value.close_range, value.ranged, value.adrenaline, value.defense, value.unique]);


    const MAX_SKILLS = 96;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    };

    const getSortedValues = () => Object.entries(value)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    const calculateSliders = (e, key) => {
        let newValue = parseInt(e.target.value);
        let difference = value[key] - newValue;
        let sorted = getSortedValues();
        let diff_remaining = difference;

        sorted[key] = newValue;
        for (let k in sorted) {
            if (k === key) {
                continue;
            }
            let val = sorted[k];
            if (val + diff_remaining < 0) {
                sorted[k] = 0;
                diff_remaining = val + diff_remaining;
            } else {
                sorted[k] = val + diff_remaining;
                diff_remaining = 0;
                break;
            }
        }
        setValue({
            healing: sorted.healing,
            close_range: sorted.close_range,
            ranged: sorted.ranged,
            adrenaline: sorted.adrenaline,
            defense: sorted.defense,
            unique: sorted.unique
        });
    };

    return (
        <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                    <b>Available Points</b>
                </Form.Label>
                <Col>
                    <Form.Control type="number" pattern="^[0-9]" value={pointCount} onChange={e => setPointCount(parseInt(e.target.value))} />
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                    {pointCount}
                </Col>
            </Form.Group>
            {Object.keys(value).map((key, index) => {
                return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Label column sm={2}>
                                <b>{startCase(camelCase(key.replace(/_/g, " ")))}</b>
                            </Form.Label>
                        </Col>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Range value={value[key]} onChange={e => calculateSliders(e, key)} min={0} max={MAX_SKILLS} />
                        </Col>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            {value[key]}%
                        </Col>
                    </Form.Group>
                );
            })}

            <Form.Group as={Row} className="mb-3">
                <Col>
                    <div className="d-grid gap-2">
                        <Button type="submit" disabled={isLoading}>

                            {(isLoading) ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : null}
                            {(isLoading) ? ' Loading…' : 'Compute'}
                        </Button>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default SelectSettings;
