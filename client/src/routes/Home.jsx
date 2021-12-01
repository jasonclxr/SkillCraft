import React from 'react';
import SelectSettings from '../components/SelectSettings';
import Header from '../components/Header';
import { Row, Col, ListGroup } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Home = () => {
    let combatSkills = ["Muscle Memory (1/5)", "Muscle Memory (1/5)", "Muscle Memory (1/5)"];
    let signSkills = ["Far-Reaching Aard (1/5)", "Far-Reaching Aard (1/5)"];
    let alchemySkills = ["Refreshment", "Refreshment", "Refreshment"];
    let generalSkills = ["Sun and Stars", "Sun and Stars", "Sun and Stars"];

    return (
        <div>
            <Header />
            <Row>
                <Col sm={5}>
                    <SelectSettings />
                </Col>

                <Col sm={7}>
                    <Tabs defaultActiveKey="combat" className="mb-3">
                        <Tab eventKey="combat" title="Combat Skills">
                            <ListGroup>
                                {combatSkills.map((skills, i) => {
                                    return <ListGroup.Item>Row {i + 1}: {skills}</ListGroup.Item>;
                                })}
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="signs" title="Signs">
                            <ListGroup>
                                {signSkills.map((skills, i) => {
                                    return <ListGroup.Item>Row {i + 1}: {skills}</ListGroup.Item>;
                                })}
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="alchemy" title="Alchemy Skills">
                            <ListGroup>
                                {alchemySkills.map((skills, i) => {
                                    return <ListGroup.Item>Row {i + 1}: {skills}</ListGroup.Item>;
                                })}
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="general" title="General Skills">
                            <ListGroup>
                                {generalSkills.map((skills, i) => {
                                    return <ListGroup.Item>Row {i + 1}: {skills}</ListGroup.Item>;
                                })}
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>

        </div>
    )
};

export default Home;
