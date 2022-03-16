import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

const Cusine = () => {
	const [cuisine, setCuisine] = useState([])
	let params = useParams()
	const getCuisine = async (name) => {
		const { REACT_APP_API_KEY: apiKey } = process.env
		const data = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`,
		)
		const recipes = await data.json()
		setCuisine(recipes.results)
	}

	useEffect(() => {
		// getCuisine('italian')
		console.log(params)
	}, [])
	return <div></div>
}

export default Cusine
