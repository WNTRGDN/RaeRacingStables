import React, { FC } from 'react'
import { IBlock } from "WNTR/interfaces"
import { Block } from "WNTR/components"
import { Container, Row, Col } from 'react-bootstrap'

const Split: FC<ISplit> = (split) => {
    return (
        <article className={`${split.alias} ${split.inverted ? split.alias + `-inverted` : null} ${split.fullScreen ? split.alias + `-fullScreen` : null}` }>
            <Container fluid>
                <Row>
                    {split.blocks.length ? split.blocks.map((block, index) => <Col key={index} xs={6} className={`${split.alias}__col d-flex`}><Block {...block} /></Col>) : null}
                </Row>
            </Container>
        </article>
    )
}

interface ISplit {
    blocks: IBlock[];
    type: string;
    alias: string;
    inverted: boolean;
    fullScreen: boolean;
}

export default Split