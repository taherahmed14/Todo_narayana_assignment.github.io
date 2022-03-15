import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
    return (
        <div className='navbar'>
            <Link className='links' to={'/'}>All Todos</Link>
            <Link className='links' to={'/todos/completed'}>Completed Todos</Link>
            <Link className='links' to={'/todos/pending'}>Pending Todos</Link>
        </div>
    )
};