import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
const Popular = () => {
	const [popular, setPopular] = useState([])
	useEffect(() => {
		getPopular()
	}, [])

	const getPopular = async () => {
		const check = localStorage.getItem('popular')
		console.log(check, typeof check)
		if (check) {
			setPopular(JSON.parse(check))
		} else {
			const { REACT_APP_API_KEY: apiKey } = process.env
			console.log(apiKey)
			const api = await fetch(
				`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`,
			)
			const data = await api.json()
			localStorage.setItem('popular', JSON.stringify(data.recipes))
			setPopular(data.recipes)
		}
	}

	return (
		<div>
			<Wrapper>
				<h3>Popular picks</h3>
				<Splide
					options={{
						perPage: 4,
						arrows: false,
						pagination: false,
						drag: 'free',
						gap: '5rem',
					}}
				>
					{popular.map((recipie) => {
						return (
							<SplideSlide key={recipie.id}>
								<Card>
									<p>{recipie.title}</p>
									<img src={recipie.image} alt={recipie.title} />
									<Gradient />
								</Card>
							</SplideSlide>
						)
					})}
				</Splide>
			</Wrapper>
		</div>
	)
}

const Wrapper = styled.div`
	margin: 4rem 0rem;
`

const Card = styled.div`
min-height:20rem;
border-radius:2rem;
overflow:hidden;
position:relative;
img{
 border-radius:2rem;
 position:absolute;
 left:0;
 width:100%;
 height:100%;
 object-fit:cover;
}
p{
 position:absolute;
 z-index:10;
 left:50%;
 bottom:10%;
 transform:translate(-50%,50%);
 color:white;
 width:100%;
 text-align:center;
 font-weight:600;
 font-size:1rem;
 height:40%;
 display:flex;
 justify:content:center;
 align-items:center;
}
`

const Gradient = styled.div`
	z-index: 3;
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`
export default Popular
