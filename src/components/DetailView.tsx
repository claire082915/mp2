import { useParams, useNavigate } from 'react-router-dom'
import type { Emoji } from '../types/emoji'

interface Props {
    emojis: Emoji[];
}

const DetailView = ({ emojis }: Props) => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    const decodedName = name ? decodeURIComponent(name) : '';
    const currentIndex = emojis.findIndex((e) => e.name === decodedName);
    const emoji = emojis[currentIndex];
    if (!emoji) return <div>Emoji not found</div>

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + emojis.length) % emojis.length; 
        navigate(`/detail/${encodeURIComponent(emojis[prevIndex].name)}`);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % emojis.length; 
        navigate(`/detail/${encodeURIComponent(emojis[nextIndex].name)}`);
    };

    return (
        <>
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handlePrev}>Next</button>

            <span dangerouslySetInnerHTML={{__html: emoji.htmlCode[0]}} />

            <h2>{emoji.name}</h2>
            <p><strong>Category: </strong>{emoji.category}</p>
            <p><strong>Group: </strong>{emoji.group}</p>
            <p><strong>Unicode: </strong>{emoji.unicode.join(', ')}</p>
            <p><strong>HTML Code: </strong>{emoji.htmlCode.join(', ')}</p>
        </>
    )
}

export default DetailView