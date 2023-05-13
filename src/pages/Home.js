import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../Components/CourseCard';
import Loading from '../Components/Loading';
import COURSES from '../services/courses/Courses';
const Home = () => {
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const GetCourses = async () => {
			setLoading(true);
			const courses = await COURSES.GET();
			setLoading(false);
			setResult(courses);
		};
		GetCourses();
		document.title = 'Shaxzod | Bosh Sahifa';
	}, []);
	return (
		<>
			<main id='main' className='main'>
				<div className='pagetitle'>
					<h1>Bosh Sahifa</h1>
					<nav>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>
								<Link to='/'>Bosh Sahifa</Link>
							</li>
						</ol>
					</nav>
				</div>

				<section className='section dashboard'>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='row'>
								<div className='col-xxl-4 col-md-6'>
									<div className='card info-card sales-card'>
										<div className='card-body'>
											<h5 className='card-title'>
												Kurslar <span>| Bepul</span>
											</h5>

											<div className='d-flex align-items-center'>
												<div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
													<i className='bi bi-journal-code'></i>
												</div>
												<div className='ps-3'>
													<h6>5</h6>
													<span className='text-success small pt-1 fw-bold'>100%</span>{' '}
													<span className='text-muted small pt-2 ps-1'>To'liq</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='col-xxl-4 col-md-6'>
									<div className='card info-card revenue-card'>
										<div className='card-body'>
											<h5 className='card-title'>
												Narxlar <span>| Bepul</span>
											</h5>

											<div className='d-flex align-items-center'>
												<div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
													<i className='bi bi-currency-dollar'></i>
												</div>
												<div className='ps-3'>
													<h6>$0,00</h6>
													<span className='text-success small pt-1 fw-bold'>100%</span>{' '}
													<span className='text-muted small pt-2 ps-1'>To'liq</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='col-xxl-4 col-xl-12'>
									<div className='card info-card customers-card'>
										<div className='card-body'>
											<h5 className='card-title'>
												O'quvchilar <span>| Cheksiz</span>
											</h5>

											<div className='d-flex align-items-center'>
												<div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
													<i className='bi bi-people'></i>
												</div>
												<div className='ps-3'>
													<h6>200 +</h6>
													<span className='text-success small pt-1 fw-bold'>100%</span>{' '}
													<span className='text-muted small pt-2 ps-1'></span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className='section'>
					<div className='row py-4'>
						<div className='col-12'>
							<h3 className=''>Barcha Kurslar</h3>
						</div>
					</div>
					{loading ? (
						<Loading />
					) : (
						<div className='row'>
							{!result.length && <p className='text-warning'> Hozircha kurslar yo'q !</p>}
							{result.map((item, index) => {
								return (
									<CourseCard
										slug={item.slug}
										price={item.price}
										id={item._id}
										courseImg={item.courseImg}
										tech={item.tech}
										title={item.title}
										key={index}
										techimg={item.techimg}
									/>
								);
							})}
						</div>
					)}
				</section>
			</main>
		</>
	);
};

export default Home;
