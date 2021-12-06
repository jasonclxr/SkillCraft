import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import backgroundImage from '../imgs/Skill-Sprite-Sheet.png';

const Sprite = ({ frame, title, desc }) => {
    const style = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${frame.x * (-1)}px ${frame.y * (-1)}px`,
        backgroundRepeat: 'no-repeat',
        width: frame.w,
        height: frame.h,
        margin: '0 auto',
    };

    return (
        <OverlayTrigger
            placement={'bottom'}
            overlay={
                <Popover id={`popover-sprite`}>
                    <Popover.Header as="h3">{title}</Popover.Header>
                    <Popover.Body>
                        {desc}
                    </Popover.Body>
                </Popover>
            }>

            <div style={style} />
        </OverlayTrigger>
    )
}

export default Sprite;
