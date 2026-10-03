// Шаг ③. Кнопка лайка.
//
// Получает props: id, initialLikes.
// Клик ставит лайк (+1), повторный клик снимает (−1). Иконка: ♡ — лайка нет, ♥ — лайк поставлен.
// В макете нажатая кнопка яркая: найдите в DevTools, какой атрибут кнопки за это отвечает, и ставьте его сами.
// Потом используйте LikeButton в MemeCard вместо обычной кнопки.

import { useState } from 'react'

export default function LikeButton(props) {
	const [liked, setLiked] = useState(Boolean(props.liked))
	const [likes, setLikes] = useState(props.initialLikes)

	function handleClick() {
		setLiked(!liked)
		setLikes(previousLikes => previousLikes + (liked ? -1 : 1))
	}

	return (
		<button className='like' aria-pressed={liked} onClick={handleClick}>
			{liked ? '♥' : '♡'} {likes}
		</button>
	)
}
