import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Emoji } from '../types/emoji'
import styles from './ListView.module.css'

interface Props {
    emojis: Emoji[];
}

type SortKey = 'name' | 'category' | 'group';

const decodeHtmlEntity = (html: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
}

const ListView = ({ emojis }: Props) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortKey>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const processedEmojis = useMemo(() => {
        const query = search.trim().toLowerCase();

        return emojis
            .filter((e) => e.name.toLowerCase().includes(query))
            .sort((a, b) => {
                const valA = a[sortBy] ?? '';
                const valB = b[sortBy] ?? '';
                const comp = valA.localeCompare(valB);
                return sortOrder === 'asc' ? comp : -comp;
            })
    }, [emojis, search, sortBy, sortOrder]);

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <label htmlFor="emoji-search" className={styles.visuallyHidden}>
                    Search Emojis
                </label>
                <input 
                    id="emoji-search"
                    type="text" 
                    className={styles.searchInput}
                    placeholder="Search emojis..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />

                <label htmlFor="emoji-sort" className={styles.visuallyHidden}>
                    Sort By
                </label>

                <select id="emoji-sort" className={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} aria-label="Sort emojis by">
                    <option value="name">Name</option>
                    <option value="category">Category</option>
                    <option value="group">Group</option>
                </select>

                <button 
                    className={styles.orderButton} 
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} 
                    aria-label={`Toggle sort order, currently ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}>
                        Order: {sortOrder.toUpperCase()}
                </button>
            </div>

            

            <ul className={styles.list}>
                {processedEmojis.map((emoji) => (
                    <li key={`${emoji.group}-${emoji.category}-${emoji.name}`} className={styles.listItem}>
                        <Link to={`/detail/${encodeURIComponent(emoji.name)}`} className={styles.link}>
                            <span className={styles.emojiGlyph}>
                                {emoji.htmlCode?.[0] ? decodeHtmlEntity(emoji.htmlCode[0]) : ''}
                            </span>
                            {emoji.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListView