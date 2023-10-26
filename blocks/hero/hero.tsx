import React, { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Hero: FC<IHero> = (block) => {
    return (
        <article className={block.alias} style={{ backgroundImage: `url(${block.background})` }}>
            <Container className={`${block.alias}__container`}>
                <Row className={`${block.alias}__row`}>
                    <Col xs={12} className={`${block.alias}__col`}>
                        <div className={`${block.alias}__body`}>
                            <img className={`${block.alias}__logo`} src={`${block.logo}`} />
                            <div className={`${block.alias}__content`}>
                                <div dangerouslySetInnerHTML={{ __html: block.content }}></div>
                                <div className={`${block.alias}__sponsors`}>
                                    <img src="./three-codes-white.svg" />
                                    <img src="./kwilliams.svg" />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </article>
    )
}

interface IHero {
    type: string,
    alias: string,
    logo: string,
    background: string,
    content: string
}

export default Hero