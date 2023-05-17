import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CourseAboudLayoutRight from '../Components/CourseAboudLayoutRight';
import CourseAboutLayoutleft from '../Components/CourseAboutLayoutleft';
import Loader from '../Components/Loader';
import COURSES from '../services/courses/Courses';
const CourseAbout = () => {
	const { logined } = useSelector(state => state.AuthLogin);
	const [course, setCourse] = useState({});
	const [loader, setLoader] = useState(false);
	const { slug } = useParams();
	useEffect(() => {
		const GetOneCourse = async () => {
			setLoader(true);
			const data = await COURSES.GETONE(slug);
			setLoader(false);
			setCourse(data);
		};
		GetOneCourse();
	}, []);

	document.title = `Shaxzod | ${course?.title}`;

	return (
		<main id='main' className='main'>
			<div className='pagetitle px-2'>
				<h1>Courses</h1>
				<nav>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item'>
							<Link to='/'>Bosh Sahifa</Link>
						</li>
						<li className='breadcrumb-item'>
							<Link to='/courses'>Kurslar</Link>
						</li>
						<li className='breadcrumb-item active'>{course?.title}</li>
					</ol>
				</nav>
			</div>
			<section className='section px-2'>
				{loader ? (
					<Loader />
				) : (
					<div className='row'>
						<CourseAboutLayoutleft
							title={course?.title}
							logined={logined}
							courseImg={course?.courseImg}
							id={course?._id}
							courseItem={course}
						/>
						<CourseAboudLayoutRight
							title={course?.title}
							tech={course?.tech}
							techimg={course?.techimg}
							price={course?.price}
							videos={course?.videos}
							hours={course?.hours}
							dagree={course?.dagree}
							language={course?.language}
						/>
						<div className='col-lg-6'></div>
						<div className='col-lg-6'>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title'>Tavsif</h5>
									{course?.discription}
									<h5 className='card-title'>Nimalarni O'rganasiz </h5>
									<ul>
										{course?.tutorial?.length &&
											course?.tutorial
												?.split(', ')
												.map((item, index) => <li key={index}>{item}</li>)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>
		</main>
	);
};

export default CourseAbout;
