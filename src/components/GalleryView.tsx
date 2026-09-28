import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Emoji } from '../types/emoji';
import { decodeHtmlEntity } from '../utils/decodeHtmlEntity'
import styles from './GalleryView.module.css'

interface Props {
    emojis: Emoji[];
}

const CATEGORIES = [
  'smileys and people',
  'animals and nature',
  'food and drink',
  'travel and places',
  'activities',
  'objects',
  'symbols',
  'flags',
];

const GalleryView = ({ emojis }: Props) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const filteredEmojis = useMemo(() => {
        if (selectedCategories.length === 0) return emojis;
        return emojis.filter((e) => 
            selectedCategories.includes((e.category ?? '').toLowerCase()));
    }, [emojis, selectedCategories])

    return (
        <div className={styles.container}>
            <fieldset className={styles.filters}>
                <legend className={styles.legend}>Filter by category</legend>

                <div className={styles.chips}>
                    {CATEGORIES.map((cat) => {
                        const checked = selectedCategories.includes(cat);
                        return (
                            <label key={cat} className={`${styles.chip} ${checked ? styles.chipActive : ''}`}>
                                <input 
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={checked}
                                    onChange={() => toggleCategory(cat)}
                                />
                                {cat}
                            </label>
                        );
                        
                    })}
                </div>
                {selectedCategories.length > 0 && (
                    <button type="button" className={styles.clearButton} onClick={() => setSelectedCategories([])}>
                        Clear filters
                    </button>
                )}
            </fieldset>
            
            {filteredEmojis.length === 0 ? (
                <p className = {styles.empty}>No emojis match the selected categories.</p>
            ) : (
                <div className={styles.grid}>
                    {filteredEmojis.map((emoji) => (
                        <Link 
                            key={`${emoji.group}-${emoji.category}-${emoji.name}`}
                            to={`/detail/${encodeURIComponent(emoji.name)}`}
                            className={styles.card}>
                                <span className={styles.emojiGlyph}>
                                    {emoji.htmlCode?.[0] ? decodeHtmlEntity(emoji.htmlCode[0]) : ''}
                                </span>
                                <p className={styles.name}>{emoji.name}</p>
                        </Link>
                    ))}
                </div>
            )}
            
        </div>
    )
}

export default GalleryView