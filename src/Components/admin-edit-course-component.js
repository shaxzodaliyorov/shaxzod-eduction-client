import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import COURSES from '../services/courses/Courses';
const AdminEditCourseComponent = () => {
	const { slug } = useParams();

	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [dagree, setDagree] = useState('junior');
	const [language, setLanguage] = useState("O'zbek Tili");
	const [tech, setTech] = useState('');
	const [discription, setDiscription] = useState('');
	const [tutorial, setTutorial] = useState('');
	const [techimg, setTechimg] = useState('');
	const [courseImg, setCourseImg] = useState('');

	const [courseid, setCourseid] = useState('');

	const { user } = useSelector(state => state.AuthLogin);

	const GetEditCourse = async () => {
		const res = await COURSES.GETONE(slug);
		setTitle(res?.title);
		setPrice(res?.price);
		setTech(res?.tech);
		setTechimg(res?.techimg);
		setLanguage(res?.language);
		setDagree(res?.dagree);
		setDiscription(res?.discription);
		setTutorial(res?.tutorial);
		setCourseImg(res?.courseImg);
		setCourseid(res?._id);
	};

	console.log(courseid)

	const EditSubmitCourse = async e => {
		e.preventDefault();
		const courseData = {title,price,language,tech,discription,dagree,tutorial:tutorial.trim(),userid:user._id}
		try {
			const res = await COURSES.UPDATE(courseid, courseData);
			res && navigate('/admin');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		GetEditCourse();
	}, []);

	return (
		<>
			<main>
				<div className='container'>
					<section className='section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4'>
						<div className='container'>
							<div className='row justify-content-center '>
								<div className='col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center'>
									<div className='card mb-3'>
										<div className='card-body'>
											<div>
												<h5 className='card-title text-center pb-0 fs-4'>Kusr ni Tahrirlash</h5>
												<p className='text-center small'>kusr Ma'lumotlarini kiriting !</p>
											</div>
											<form className='row g-3 needs-validation' onSubmit={EditSubmitCourse}>
												<div className='col-12'>
													<label htmlFor='title' className='form-label'>
														kurs rasmi
													</label>{' '}
													<br />
													<img width={'100'} height={'100'} src={courseImg} alt={title} />
												</div>
												<div className='col-12'>
													<label htmlFor='title' className='form-label'>
														kurs nomi
													</label>
													<input
														type='text'
														className='form-control'
														id='title'
														value={title}
														onChange={e => setTitle(e.target.value)}
													/>
												</div>

												<div className='col-12'>
													<label htmlFor='price' className='form-label'>
														narxi
													</label>
													<div className='input-group has-validation'>
														<input
															type='number'
															value={price}
															onChange={e => setPrice(e.target.value)}
															className='form-control'
															id='price'
														/>
													</div>
												</div>
												<div className='col-12'>
													<label htmlFor='yourEmail' className='form-label'>
														Ustoz
													</label>
													<input
														type='text'
														value={tech}
														onChange={e => setTech(e.target.value)}
														className='form-control'
														id='yourEmail'
													/>
												</div>
												<div className='col-12'>
													<label htmlFor='techimg' className='form-label'>
														Ustoz Rasmi
													</label>
													<br />
													<img width={'80'} height={'80'} src={techimg} alt={tech} />
												</div>
												<div className='col-12'>
													<label htmlFor='lang' className='form-label'>
														Til
													</label>
													<br />
													<select
														value={language}
														onChange={e => setLanguage(e.target.value)}
														id='lang'
													>
														<option value={"O'zbek Tili"}>O'zbek Tili</option>
														<option value={'Ingiliz Tili'}>Ingiliz Tili</option>
														<option value={'Rus Tili'}>Rus Tili</option>
													</select>
												</div>
												<div className='col-12'>
													<label htmlFor='dagree' className='form-label'>
														Daraja
													</label>
													<br />
													<select
														value={dagree}
														onChange={e => setDagree(e.target.value)}
														id='dagree'
													>
														<option value={'junior'}>Boshlang'ich</option>
														<option value={'middile'}>O'rtacha</option>
														<option value={'senior'}>Murakkab</option>
													</select>
												</div>
												<div className='col-12'>
													<label htmlFor='discription' className='form-label'>
														Tavsif
													</label>
													<textarea
														value={discription}
														onChange={e => setDiscription(e.target.value)}
														className='form-control'
														id='discription'
													></textarea>
												</div>
												<div className='col-12'>
													<label htmlFor='tutorial' className='form-label'>
														Nimalarni o'rganadi
													</label>
													<textarea
														value={tutorial}
														onChange={e => setTutorial(e.target.value)}
														className='form-control'
														id='tutorial'
													></textarea>
												</div>
												<div className='col-12'>
													<button
														className={`btn btn-primary w-100 ${false ? 'cursor-no-drop' : ''}`}
														type='submit'
														disabled={false}
													>
														{false ? <Loading /> : 'Create Account'}{' '}
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</main>
			;
		</>
	);
};

export default AdminEditCourseComponent;
