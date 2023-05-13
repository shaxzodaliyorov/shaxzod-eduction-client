import React from 'react';
import { Link } from 'react-router-dom';
const CourseCard = ({ title, courseImg, tech, price, id, techimg, slug }) => {
	return (
		<div className='col-md-4 col-sm-6'>
			<Link to={`/courses/${slug}`}>
				<div className='card'>
					<div className='card-header'>
						<img
							src={courseImg}
							className='card-img-top'
							alt='...'
							style={{ maxWidth: '100%', height: '300px' }}
						/>
					</div>
					<div className='card-body'>
						<div className='row'>
							<div className='col-6'>
								<h5 className='card-title pb-0  mb-0 text-black'>{title}</h5>
							</div>
							<div className='col-6 text-end'>
								<div className='mt-3 text-danger'>
									<del>250 000 so'm</del>
								</div>
							</div>
						</div>
					</div>
					<div className='card-footer'>
						<div className='row nav-link nav-profile d-flex justify-content-between  align-items-center '>
							<div className='col-9'>
								{techimg ? (
									<img
										src={techimg}
										alt=''
										style={{ width: '28px', height: '28px', borderRadius: '50%' }}
									/>
								) : (
									<i
										className='bi bi-person-circle rounded-circle mt-2'
										style={{ fontSize: '22px' }}
									></i>
								)}
								<span className='px-2 mb-2 '>{tech}</span>
							</div>
							<div className='col-3 text-end'>
								<span className='text-black'>
									{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CourseCard;
