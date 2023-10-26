import React, { FC } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Image } from 'react-bootstrap'

const Cards: FC<ICards> = (cards) => {
    return (
        <article className={cards.alias}>
            <Container>
                <Row>
                    {cards.heading ?
                        <Col xs={12}>
                            <h2 className={`${cards.alias}__heading`}>
                                {cards.heading}
                            </h2>
                        </Col>
                    : null }
                    {cards.items.map((item, index) =>
                        <Col xs={6} xl={{ span: 5, offset: index ? 0 : 1 }} xxl={{ span: 4, offset: index ? 0 : 2 }} key={index}>
                            {item.link ?
                                <Link className={`${cards.alias}__card`} href={item.link} data-content={item.text}>
                                    <h3 className={`${cards.alias}__title`}>{item.title}</h3>
                                    <p className={`${cards.alias}__text visually-hidden`}>{item.text}</p>
                                    <Image className={`${cards.alias}__image`} src={`${item.image}?mode=crop&width=500&height=500`} />
                                </Link> :
                                <div className={`${cards.alias}__card`} data-content={item.text}>
                                    <h3 className={`${cards.alias}__title`}>{item.title}</h3>
                                    <p className={`${cards.alias}__text visually-hidden`}>{item.text}</p>
                                    <Image className={`${cards.alias}__image`} src={`${item.image}?mode=crop&width=500&height=500`} />
                                </div>
                            }
                        </Col>
                    )}
                </Row>
            </Container>
        </article>
    )
}

interface ICards {
    heading: string;
    items: ICard[];
    type: string;
    alias: string;
}

interface ICard {
    image: string;
    link: string;
    text: string;
    title: string;
}

export default Cards