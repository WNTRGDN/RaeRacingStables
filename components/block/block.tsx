import React, { FC } from 'react'
import { Hero, Heading, Text, Cards, Image, Split, Teasers, Figures, Form, Breadcrumbs } from 'WNTR/blocks'
import { IBlock } from 'WNTR/interfaces';

var controls: { [key: string]: any } = {
    Hero: Hero,
    Heading: Heading,
    Text: Text,
    Cards: Cards,
    Image: Image,
    Split: Split,
    Teasers: Teasers,
    Figures: Figures,
    Form: Form,
    Breadcrumbs: Breadcrumbs
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