import React, { FC } from 'react'
import { Hero, Heading, Text } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces';

var controls: { [key: string]: any } = {
    Hero: Hero,
    Heading: Heading,
    Text: Text
};

const Block: FC<IBlock> = (block) => {
    if (controls[block.type] !== undefined){
        const Block = controls[block.type]
        return (
            <Block {...block} />
        )
    }
    return null
}

export default Block