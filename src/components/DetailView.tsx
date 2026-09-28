import { useParams, useNavigate, Link } from 'react-router-dom'
import type { Emoji } from '../types/emoji'
import { decodeHtmlEntity } from '../utils/decodeHtmlEntity';
import styles from './DetailView.module.css'

interface Props {
    emojis: Emoji[];
}

const DetailView = ({ emojis }: Props) => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    const currentIndex = emojis.findIndex((e) => e.name === name);
    const emoji = emojis[currentIndex];

    if (!emoji) {
        return (
            <div className={styles.container}>
                <p className={styles.notFound}>Emoji not found.</p>
                <Link to="/" className={styles.backLink}>Back to list</Link>
            </div>
        )
    }

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + emojis.length) % emojis.length; 
        navigate(`/detail/${encodeURIComponent(emojis[prevIndex].name)}`);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % emojis.length; 
        navigate(`/detail/${encodeURIComponent(emojis[nextIndex].name)}`);
    };

    const glyph = emoji.htmlCode?.[0] ? decodeHtmlEntity(emoji.htmlCode[0]) : '';

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.backLink}>Back to list</Link>

            <div className={styles.card}>
                <div className={styles.nav}>
                    <button type="button" className={styles.navButton} onClick={handlePrev}>Previous</button>
                    <button type="button" className={styles.navButton} onClick={handleNext}>Next</button>
                </div>

                <span className={styles.glyph} role="img" aria-label={emoji.name}>
                    {glyph}
                </span>

                <h2 className={styles.title}>{emoji.name}</h2>
                <dl className={styles.details}>
                    <dt>Category</dt>
                    <dd>{emoji.category}</dd>

                    <dt>Group</dt>
                    <dd>{emoji.group}</dd>

                    <dt>Unicode</dt>
                    <dd>{(emoji.unicode ?? []).join(', ')}</dd>

                    <dt>HTML Code</dt>
                    <dd>{(emoji.htmlCode ?? []).join(', ')}</dd>
                </dl>
                
            </div>
        </div>
    )
}

export default DetailView