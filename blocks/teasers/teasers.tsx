import React, { FC, useContext } from 'react'
import Link from 'next/link'
import Context from 'WNTR/utils/context'
import { IBlock, ICrops } from 'WNTR/interfaces'
import { Container, Row, Col, Image } from 'react-bootstrap'

const Teasers: FC<ITeasers> = (teasers) => {

    const xlFirst = [
        { span: 12, offset: 0 },
        { span: 4, offset: 4 },
        { span: 4, offset: 2 },
        { span: 4, offset: 0 }
    ]

    const xlOthers = [
        { span: 12, offset: 0 },
        { span: 4, offset: 0 },
        { span: 4, offset: 0 },
        { span: 4, offset: 0 }
    ]

    const md = [
        { span: 12 },
        { span: 12 },
        { span: 6 },
        { span: 4 }
    ]

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
                    {teasers.pages.sort((a,b) => { return a.order - b.order }).map((teaser, index) =>
                        <Col xs={12} md={md[teasers.pages.length]} xl={!index ? xlFirst[teasers.pages.length] : xlOthers[teasers.pages.length]} key={index} className={`${teasers.alias}__col`}>
                            <Teaser {...teaser} alias={teasers.alias} />
                        </Col>
                    )}
                </Row>
            </Container>
        </article>
    )
}

const Teaser: FC<ITeaser> = (teaser) => {

    const link = teaser.link
    const context = useContext(Context)
    const image = teaser.image

    return (
        <div className={`${teaser.alias}__teaser`}>
            { React.createElement(
                link ? Link : 'div',
                {
                    className: `${teaser.alias}__link-image ${teaser.alias}__link-image--${image ? 'included' : 'without'}`,
                    href: teaser.link
                },
                <Image className={`${teaser.alias}__image`} src={image ? `${teaser.image}?mode=crop&width=500&height=400` : `${context.page?.metaData.image}?mode=crop&width=500&height=400`} />
            )}
            { React.createElement(
                link ? Link : 'div',
                {
                    className: `${teaser.alias}__link-title`,
                    href: teaser.link
                },
                <h3 className={`${teaser.alias}__title`}>{teaser.title}</h3>
            )}
            <div className={`${teaser.alias}__text`} dangerouslySetInnerHTML={{ __html: teaser.text }}></div>
            { link ? <Link className={`${teaser.alias}__link-button`} href={teaser.link}>See More</Link> : null }
        </div>
    )
}

interface ITeasers extends IBlock {
    heading: string,
    pages: ITeaser[]
}

interface ITeaser {
    alias: string,
    image: string,
    link: string,
    text: string,
    title: string,
    crops: ICrops,
    order: number
}

export default Teasers