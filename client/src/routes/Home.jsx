import React, { useContext } from 'react';
import SelectSettings from '../components/SelectSettings';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Row, Col } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { capitalize } from 'lodash';
import Sprite from '../components/Sprite';
import { Container } from 'react-bootstrap';

const chunkArrayInGroups = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size)
        result.push(arr.slice(i, i + size));
    return result;
}

const Home = () => {
    const { selectedSkills } = useContext(AppContext);
    return (
        <div style={{ zIndex: 5 }}>
            <Header />
            <Row>
                <Col className={"settingsForm bodyFont"} sm={4}>
                    <SelectSettings />
                </Col>

                <Col sm={7}>
                    <Tabs defaultActiveKey="combat" className="mb-3 " variant={"tabs"}>
                        {selectedSkills && Object.keys(selectedSkills).map((key, index) => {
                            let data = [];
                            if (selectedSkills) {
                                data = chunkArrayInGroups(selectedSkills[key], 5);
                            }
                            return (
                                <Tab eventKey={key} title={capitalize(key) + " Skills"} key={index}>
                                    <Container className={"container"}>
                                        {data.map((row, rowIndex) => {
                                            return (
                                                <Row xs={5} key={rowIndex} className={"rowItem"}>
                                                    {row.map((item, itemIndex) => {
                                                        return (
                                                            <Col xs={2} key={itemIndex} className={"gridItem bodyFont"} disabled={item.points === 0}>
                                                                <Sprite item={item} />
                                                                {item.points} / {item.maxPoints}
                                                            </Col>
                                                        );
                                                    })}
                                                </Row>
                                            )
                                        })}
                                    </Container>
                                </Tab>
                            );
                        })}
                    </Tabs>
                </Col>
            </Row>
        </div>
    )
};

export default Home;
