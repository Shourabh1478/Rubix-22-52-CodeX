// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import React from 'react'
import styled from 'styled-components'

import { Component } from 'react'
import { logoutUser } from "../../actions/authActions";
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'
let user_id ="";
let user_name= "";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
 

  render() {
    const { user } = this.props.auth;
        user_id = user.id;
        user_name= user.name;

      
    return (
        <Nav>
            {/* <Logo src="./images/logo.svg" /> */}
            <NavMenu>
                <a>
                    {/* <img src="./images/home-icon.svg" /> */}
                    <Link to='/dashboard'><span>HOME</span></Link>
                </a>
                <a>
                    {/* <img src="./images/watchlist-icon.svg" /> */}
                    <Link to="/appointment"><span>Appointments</span></Link>
                </a>
                <a>
                    {/* <img src="./images/original-icon.svg" /> */}
                    <Link to='/schedules'><span>Scheduled</span></Link>
                </a>
                <a>
                    {/* <img src="./images/movie-icon.svg" /> */}
                    <Link to ='/userinfo'><span>User Info</span></Link>
                </a>
                <a>
                    {/* <img src="./images/series-icon.svg" /> */}
                    <Link to='/doctors'><span>Doctors Info</span></Link>
                </a>



            </NavMenu>

            <Logout onClick={this.onLogoutClick} className="btn waves-effect waves-light hoverable blue accent-3">
             Logout
           </Logout>


        </Nav>
    )
}}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export { user_id, user_name }
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);



const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    /* overflow-x: hidden; */
`
const Logo= styled.img`
    width: 80px;
`
const NavMenu= styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;


    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            text-transform: uppercase;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier (0.25, 0.46, e.45, 0.94) 0s;
                /* // transition: all 0.3s; */
                transform: scaleX(0);
            }
    
        }


        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }

    }
    

`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const Logout = styled.button` 
    border-radius: 4px;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: 400;

`
