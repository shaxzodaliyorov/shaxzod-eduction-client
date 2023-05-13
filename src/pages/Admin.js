import { Link } from 'react-router-dom';
import AdminCoursesComponent from '../Components/admin-courses-component';
import AdminUsersComponent from '../Components/admin-users-component';
import AdminVidoesComponent from '../Components/admin-vidoes-component';

const Admin = () => {
	return (
		<main id='main' className='main'>
			<div className='pagetitle px-2'>
				<h1>Admin Dashboard</h1>
				<nav>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item'>
							<Link to='/'>Bosh Sahifa</Link>
						</li>
						<li className='breadcrumb-item active'>Kurslar</li>
					</ol>
				</nav>
			</div>
			<section className='section px-2'>
				<AdminCoursesComponent />
				<AdminVidoesComponent />
				<AdminUsersComponent/>
			</section>
		</main>
	);
};

export default Admin;
