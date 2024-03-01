import React from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import close_icon from '../../assets/close.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link, useNavigate } from 'react-router-dom';

//
const Navbar = ({
    setSidebar,
    searchData,
    setSearchData,
    isSearched,
    setIsSearched,
}) => {
    const navigate = useNavigate();
    return (
        <nav className="flex-div">
            <div className="nav-left flex-div">
                <img
                    className="menu-icon"
                    src={menu_icon}
                    onClick={() => setSidebar((prev) => !prev)}
                />
                <Link to="/" onClick={() => isSearched(false)}>
                    <img className="logo" src={logo} />
                </Link>
            </div>

            <div className="nav-middle flex-div">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsSearched((prev) => !prev);
                        navigate('/search');
                    }}>
                    <div className="search-box flex-div">
                        <input
                            onChange={(e) =>
                                setSearchData(e.target.value)
                            }
                            value={searchData}
                            type="text"
                            placeholder="Search"
                        />
                        <Link to={!isSearched && '/search'}>
                            <img
                                src={
                                    !isSearched
                                        ? search_icon
                                        : close_icon
                                }
                                onClick={() => {
                                    setIsSearched((prev) => !prev);
                                    isSearched
                                        ? setSearchData('')
                                        : null;
                                }}
                                alt=""
                            />
                        </Link>
                    </div>
                </form>
            </div>
            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img
                    src={profile_icon}
                    className="user-icon"
                    alt=""
                />
            </div>
        </nav>
    );
};

export default Navbar;
