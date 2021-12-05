import React, { useContext } from 'react';
import SelectSettings from '../components/SelectSettings';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Row, Col, ListGroup } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { capitalize } from 'lodash';
import Sprite from '../components/Sprite';

import customData from '../imgs/skills-spritesheet.json';

const Home = () => {
    const { selectedSkills } = useContext(AppContext);
    return (
        <div style={{ zIndex: 5 }}>
            {Object.keys(customData.frames).map((key, index) => {
                return <Sprite frame={customData.frames[key].frame} hover={key} />

            })}
            <Header />
            <Row>
                <Col style={{
                    backgroundColor: '#ced0d4',
                    padding: '15px',
                    borderRadius: 10,
                    height: '100%',
                }} sm={4}>
                    <SelectSettings />
                </Col>

                <Col sm={7}>
                    <Tabs defaultActiveKey="combat" className="mb-3">
                        {selectedSkills && Object.keys(selectedSkills).map((key, index) => {
                            return (<Tab eventKey={key} title={capitalize(key) + " Skills"} key={index}>
                                <ListGroup>
                                    {selectedSkills[key].map((skills, i) => {
                                        return <ListGroup.Item key={i}>Row {skills.row + 1}: {skills.name} ({skills.points} / {skills.maxPoints})</ListGroup.Item>;
                                    })}
                                </ListGroup>
                            </Tab>);
                        })}
                    </Tabs>
                </Col>
            </Row>
        </div>
    )
};

export default Home;
