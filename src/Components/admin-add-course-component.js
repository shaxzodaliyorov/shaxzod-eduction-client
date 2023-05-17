import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import COURSES from '../services/courses/Courses';

const AdminAddCourseComponent = () => {

	const [title, setTitle] = useState('');
	const [courseImg, setCourseImg] = useState('');
	const [price, setPrice] = useState(0);
	const [dagree, setDagree] = useState('junior');
	const [language, setLanguage] = useState("O'zbek Tili");
	const [tech, setTech] = useState('');
	const [discription, setDiscription] = useState('');
	const [tutorial, setTutorial] = useState('');
	const [techimg, setTechimg] = useState('');

	const base64Data = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setTechimg(reader.result);
		};
	};

	const { user } = useSelector(state => state.AuthLogin);

	const navigate = useNavigate();

	const submitCourse = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('courseImg', courseImg);
		formData.append('price', price);
		formData.append('language', language);
		formData.append('tech', tech);
		formData.append('discription', discription);
		formData.append('dagree', dagree);
		formData.append('tutorial', tutorial.trim());
		formData.append('techimg', techimg);
		if (title && courseImg && price && language && tech && discription && tutorial && techimg) {
			try {
				await COURSES.ADDCOURSE(user._id, formData);
				navigate('/admin');
			} catch (error) {
				console.log(error.response.data);
			}
		} else {
			alert("Iltimos Malumot hammasini to'ldiring !");
		}
	};


	return <main>
	<div className='container'>
		<section className='section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4'>
			<div className='container'>
				<div className='row justify-content-center '>
					<div className='col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center'>
						<div className='card mb-3'>
							<div className='card-body'>
								<div>
									<h5 className='card-title text-center pb-0 fs-4'>Kusr Qo'shish</h5>
									<p className='text-center small'>kusr Ma'lumotlarini kiriting !</p>
								</div>
								<form className='row g-3 needs-validation' onSubmit={submitCourse}>
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
										<label htmlFor='yourName' className='form-label'>
											kurs Rasmi
										</label>
										<input
											type='file'
											onChange={e => setCourseImg(e.target.files[0])}
											className='form-control'
											id='yourName'
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
										<input
											type='file'
											onChange={e => base64Data(e.target.files[0])}
											className='form-control'
											id='techimg'
										/>
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
</main>;
};

export default AdminAddCourseComponent;
