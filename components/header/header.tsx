import React, { FC, useState, useContext } from 'react'
import Context from 'WNTR/utils/context'
import { IMenu, ILink } from 'WNTR/interfaces'
import { Container, Navbar, Offcanvas, Nav } from 'react-bootstrap'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const component = {
    name: 'wntrHeaderComponent'
}

const Header: FC = () => {

    const website = useContext(Context).website
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    let menu = website?.menus?.filter(m => m.title === "Main")[0]

    return (
        <header className={component.name}>
            {menu !== undefined ?
                <Navbar expand="md" className={`${component.name}__navbar`} fixed="top">
                    <Container>
                        <Navbar.Brand className={`${component.name}__navbar d-sm-none`}></Navbar.Brand>
                        <Navbar.Toggle aria-controls={component.name} className="ms-auto" onClick={handleShow} />
                        <Navbar.Offcanvas show={show} onHide={handleClose} id={component.name} placement="end">
                            <Offcanvas.Header closeButton></Offcanvas.Header>
                            <Offcanvas.Body onClick={handleClose}>
                                <Menu {...menu} />
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            : null}
        </header>
    )
}

const Menu: FC<IMenu> = (menu) => {
    return(
        <Nav key={menu.alias} className={`${component.name}__navigation`}>
            {menu.includeHome ? <NavigationLink key="-1" url="/" title="Home" /> : null}
            {menu.links.map((link, index) =>
                link.url ? <NavigationLink key={index} {...link} /> : null
            )}
        </Nav>
    )
}

const NavigationLink: FC<ILink> = (link) => {

    const pathname = usePathname()
    return (
        <Nav.Item className={`${component.name}__navigation-item`}>
            <Nav.Link as={Link} scroll={true} href={link.url} className={`${pathname === link.url ? 'active' : null}`}>{link.title}</Nav.Link>
        </Nav.Item>
    )
}

export default Header