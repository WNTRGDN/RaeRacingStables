import React, { FC } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Image } from 'react-bootstrap'

const Teasers: FC<ITeasers> = (teasers) => {
    return (
        <article className={teasers.alias}>
            <Container>
                <Row>
                    {teasers.heading ?
                        <Col xs={12}>
                            <h2 className={`${teasers.alias}__heading`}>
                                {teasers.heading}
                            </h2>
                        </Col>
                    : null }
                    {teasers.pages.sort((a,b) => { return a.order - b.order }).map((item, index) =>
                        <Col xs={12} lg={4} key={index} className={`${teasers.alias}__col`}>
                            {item.link ?
                                <div className={`${teasers.alias}__teaser`}>
                                    <Link className={`${teasers.alias}__link-image`} href={item.link}>
                                        <Image className={`${teasers.alias}__image`} src={`${item.image}?mode=crop&width=500&height=500`} />
                                    </Link>
                                    <Link className={`${teasers.alias}__link-title`} href={item.link}>
                                        <h3 className={`${teasers.alias}__title`}>{item.title}</h3>
                                    </Link>
                                    <div className={`${teasers.alias}__text`} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                    <Link className={`${teasers.alias}__link-button`} href={item.link}>See More</Link>
                                </div>
                                 :
                                <Row>
                                    <Image className={`${teasers.alias}__image`} src={`${item.image}?mode=crop&width=500&height=500`} />
                                    <h3 className={`${teasers.alias}__title`}>{item.title}</h3>
                                    <div className={`${teasers.alias}__text`} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                </Row>
                            }
                        </Col>
                    )}
                </Row>
            </Container>
        </article>
    )
}

interface ITeasers {
    heading: string;
    pages: ITeaser[];
    type: string;
    alias: string;
}

interface ITeaser {
    image: string;
    link: string;
    text: string;
    title: string;
    order: number;
}

export default Teasers