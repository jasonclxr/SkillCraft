import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import backgroundImage from '../imgs/Skill-Sprite-Sheet.png';
import customData from '../imgs/skills-spritesheet.json';

const Sprite = ({ item }) => {
    const info = customData.frames[item.name]
    if (!info) {
        console.log(item.name)
        return <div></div>;
    }
    const style = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${info.frame.x * (-1)}px ${info.frame.y * (-1)}px`,
        backgroundRepeat: 'no-repeat',
        width: info.frame.w,
        height: info.frame.h,
        margin: '0 auto',
    };

    return (
        <OverlayTrigger
            placement={'bottom'}
            overlay={
                <Popover id={`popover-sprite`}>
                    <Popover.Header as="h3">
                        {`${item.points}/${item.maxPoints} ${item.name}`}
                    </Popover.Header>
                    <Popover.Body>
                        {info.desc}
                    </Popover.Body>
                </Popover>
            }>

            <div style={style} />
        </OverlayTrigger>
    )
}

export default Sprite;
