import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import backgroundImage from '../imgs/Skill-Sprite-Sheet.png';

const Sprite = ({ frame, hover }) => {
    const style = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${frame.x * (-1)}px ${frame.y * (-1)}px`,
        backgroundRepeat: 'no-repeat',
        width: frame.w,
        height: frame.h,
    };

    return (
        <OverlayTrigger
            placement={'bottom'}
            overlay={
                <Popover id={`popover-sprite`}>
                    <Popover.Header as="h3">{hover}</Popover.Header>
                    <Popover.Body>
                        {hover}
                    </Popover.Body>
                </Popover>
            }>

            <div style={style} />
        </OverlayTrigger>
    )
}

export default Sprite;
