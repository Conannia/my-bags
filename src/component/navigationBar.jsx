import React from 'react'
import {
    Navbar,
    Nav,
    Dropdown,
    Button,
    Image,
    Badge
} from 'react-bootstrap'
import { LOGO } from '../assets'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'

class NavigationBar extends React.Component {
    
    render() {
        return (
            <Navbar fixed="top" className="px-5" style={styles.navbar} expand="lg">
                <Navbar.Brand href="#home">
                    <Image src={LOGO.default} style={styles.image} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" style={styles.navLink}>Home</Nav.Link>
                        <Nav.Link href="#ourproduct" style={styles.navLink}>Product</Nav.Link>
                        <Nav.Link href='#contactus' style={styles.navLink}>Contact Us</Nav.Link>
                    </Nav>
                    {this.props.role === 'user'
                    ?
                    <Button variant="outline-light" as={Link} to="/cart">
                        <i className="fas fa-shopping-cart"></i> <Badge variant="light">{this.props.cart.length}</Badge>
                    </Button>
                    :
                    null
                    }
                    
                    <Dropdown style={{ marginLeft: '10px' }}>
                        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                            {this.props.username ? this.props.username : "Username"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.username
                                ?
                                <>
                                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={this.props.role === 'admin' ? "/historyAdmin" : "/history" } >
                                        {this.props.role === "admin" ? "History Admin" : "History"}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logout} >Log Out</Dropdown.Item>
                                </>
                                :
                                <>
                                    <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                                </>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const styles = {
    navbar: {
        backgroundColor: '#B762C1',
    },
    image: {
        height: '40px'
    },
    navLink: {
        color: 'white'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { logout })(NavigationBar)