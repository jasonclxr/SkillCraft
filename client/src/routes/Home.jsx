import React, { useContext } from 'react';
import SelectSettings from '../components/SelectSettings';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Row, Col, ListGroup } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { capitalize } from 'lodash';

const Home = () => {
    const { selectedSkills } = useContext(AppContext);

    return (
        <div>
            <Header />
            <Row>
                <Col sm={5}>
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
