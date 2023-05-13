import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useResolvedPath } from 'react-router-dom';
import { Navigation } from '../config/constants';
const Sidebar = () => {
	const LinkClose = () => {
		if (document.body.classList.contains('toggle-sidebar')) {
			document.body.classList.remove('toggle-sidebar');
		}
	};
	const { logined, user } = useSelector(state => state.AuthLogin);

	const { pathname } = useResolvedPath();

	return (
		<aside id='sidebar' className='sidebar'>
			<ul className='sidebar-nav' id='sidebar-nav'>
				{Navigation.map((item, index) => {
					return (
						<div key={index}>
							<li className='nav-heading'>{item.title}</li>
							{item.pages.map((nav, idx) => {
								const active = pathname === nav.route;
								return (
									<li className='nav-item text-white' key={idx}>
										<Link
											className={`nav-link ${active ? '' : 'collapsed'}`}
											to={nav.route}
											onClick={LinkClose}
											style={{
												background: `${active ? '#4682dbd9' : ''}`,
												color: active ? '#fff' : '',
											}}
										>
											<i className={`${nav.icon} ${active ? 'text-white' : ''}`}></i>
											<span>{nav.label}</span>
										</Link>
									</li>
								);
							})}
						</div>
					);
				})}
				{logined && user && user.isadmin ? (
					<li className='nav-item'>
						<Link
							className='nav-link collapsed '
							to='/admin'
							style={{
								background: `${pathname === '/admin' ? '#4682dbd9' : ''}`,
								color: pathname === '/admin' ? '#fff' : '',
							}}
						>
							<i
								className={`bi bi-shield-lock-fill ${pathname === '/admin' ? 'text-white' : ''} `}
							></i>
							<span>Admin</span>
						</Link>
					</li>
				) : null}
				{logined ? (
					<li className='nav-item'>
						<Link
							className='nav-link collapsed '
							to='/profile'
							onClick={LinkClose}
							style={{
								background: `${pathname === '/profile' ? '#4682dbd9' : ''}`,
								color: pathname === '/profile' ? '#fff' : '',
							}}
						>
							<i className={`bi bi-person ${pathname === '/profile' ? 'text-white' : ''} `}></i>
							<span>Profil</span>
						</Link>
					</li>
				) : (
					<li className='nav-item'>
						<Link
							className='nav-link collapsed '
							to='/login'
							onClick={LinkClose}
							style={{
								background: `${pathname === '/login' ? '#4682dbd9' : ''}`,
								color: pathname === '/login' ? '#fff' : '',
							}}
						>
							<i
								className={`bi bi-box-arrow-in-right ${pathname === '/login' ? 'text-white' : ''}`}
							></i>
							<span>Kirish</span>
						</Link>
					</li>
				)}
			</ul>
		</aside>
	);
};

export default Sidebar;
