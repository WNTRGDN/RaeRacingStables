import React, { FC, useState, useContext, useEffect } from 'react'
import Context from 'WNTR/utils/context'
import { Form } from 'WNTR/components'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

const component = {
    name: 'wntrFooterComponent'
}

const Footer: FC = () => {

    const website = useContext(Context).website
    let quicklinks = website?.menus?.filter(m => m.title === "Quicklinks")[0]
    let locations = website?.menus?.filter(m => m.title === "Locations")[0]
    let syndicates = website?.menus?.filter(m => m.title === "Syndicates")[0]
    let associations = website?.menus?.filter(m => m.title === "Associations")[0]

    return(
        <footer className={component.name}>
            <Container>
                <Row>
                    <Col xs={6} lg={5} xl={2}>
                        <h4>{locations?.title}</h4>
                        <menu className={`${component.name}__menu`}>
                            {locations?.links?.map((link, index) => <Link key={index} href={link.url}>{link.title}</Link> )}
                        </menu>
                        <h4>{syndicates?.title}</h4>
                        <menu className={`${component.name}__menu`}>
                            {syndicates?.links?.map((link, index) => <Link key={index} href={link.url}>{link.title}</Link> )}
                        </menu>
                    </Col>
                    <Col xs={6} lg={5} xl={2}>
                    <h4>{quicklinks?.title}</h4>
                        <menu className={`${component.name}__menu`}>
                            {quicklinks?.links?.map((link, index) => <Link key={index} href={link.url}>{link.title}</Link> )}
                        </menu>
                        <h4>{associations?.title}</h4>
                        <menu className={`${component.name}__menu`}>
                            {associations?.links?.map((link, index) => <Link key={index} href={link.url}>{link.title}</Link> )}
                        </menu>
                    </Col>
                    { website.socials ?
                        <Col xs={12} lg={2} xl={2}>
                            <h4>Socials</h4>
                            <menu className={`${component.name}__menu ${component.name}__menu-social`}>
                                { website.socials.facebook ? <Link href={`${website.socials.facebook}`} title="Link us on Facebook" target="_blank"><img src="../../facebook.svg" /></Link> : null }
                                { website.socials.instagram ? <Link href={`${website.socials.instagram}`}  title="Follow us on Instagram" target="_blank"><img src="../../instagram.svg" /></Link> : null }
                                <Link href="https://www.instagram.com/threecodessyndication/" title="Check out Three Codes Syndication" target="_blank"><img src="../../threecodes.svg" /></Link>
                            </menu>
                        </Col>
                    : null }
                    <Col xs={12} xl={6}>
                        <h4>Contact</h4>
                        <Form />
                    </Col>
                    <Col xs={12}>
                        <small className={`${component.name}__copyright`}>&copy; {(new Date().getFullYear())} {website?.name}</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer