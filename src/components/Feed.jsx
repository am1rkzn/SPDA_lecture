// Шаги ④–⑤. Загрузка ленты и её состояния.

import { useEffect, useState } from 'react'
import { API_URL } from '../api.js'
import MemeCard from './MemeCard.jsx'

export default function Feed() {
	const [memes, setMemes] = useState([])
	const [status, setStatus] = useState('loading')
	const [retryCount, setRetryCount] = useState(0)

	useEffect(() => {
		const controller = new AbortController()

		async function loadMemes() {
			setStatus('loading')

			try {
				const response = await fetch(`${API_URL}/api/memes`, {
					credentials: 'include',
					signal: controller.signal,
				})

				if (!response.ok) {
					throw new Error('Не удалось загрузить ленту')
				}

				const data = await response.json()
				if (!Array.isArray(data)) {
					throw new Error('Сервер вернул неожиданные данные')
				}

				setMemes(data)
				setStatus(data.length === 0 ? 'empty' : 'success')
			} catch (error) {
				if (error.name !== 'AbortError') {
					setStatus('error')
				}
			}
		}

		loadMemes()
		return () => controller.abort()
	}, [retryCount])

	if (status === 'loading') {
		return <p className='status'>Загружаем мемы…</p>
	}

	if (status === 'error') {
		return (
			<div className='status'>
				<p>Не получилось загрузить ленту.</p>
				<button onClick={() => setRetryCount(count => count + 1)}>
					Повторить
				</button>
			</div>
		)
	}

	if (status === 'empty') {
		return <p className='status'>Мемов пока нет</p>
	}

	return (
		<section className='feed'>
			{memes.map(meme => (
				<MemeCard key={meme.id} {...meme} />
			))}
		</section>
	)
}
