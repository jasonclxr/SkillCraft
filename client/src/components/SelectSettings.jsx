import React, { useContext, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import SkillSlider from './SkillSlider';

const SelectSettings = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={1}>
                    Available Points
                </Form.Label>
                <Col sm="auto">
                    <Form.Control type="number"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <SkillSlider label="Agility"/>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <SkillSlider label="Stealth"/>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <SkillSlider label="Survivability"/>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <SkillSlider label="Magic"/>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <SkillSlider label="Signs"/>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 1 }}>
                    <Button type="submit" onClick={e => handleSubmit(e)}>Sign in</Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default SelectSettings;
