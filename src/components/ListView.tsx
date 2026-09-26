import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Emoji } from '../types/emoji'

interface Props {
    emojis: Emoji[];
}

const ListView = ({ emojis }: Props) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'category' | 'group'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const processedEmojis = useMemo(() => {
        return emojis
            .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                const valA = a[sortBy];
                const valB = b[sortBy];
                const comp = valA.localeCompare(valB);
                return sortOrder === 'asc' ? comp : -comp;
            })
    }, [emojis, search, sortBy, sortOrder]);

    return (
        <>
            <input type="text" placeholder="Search emojis..." value={search} onChange={(e) => setSearch(e.target.value)} />

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="group">Group</option>
            </select>

            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Order: {sortOrder.toUpperCase()}
            </button>

            <ul>
                {processedEmojis.map((emoji) => (
                    <li key={emoji.name}>
                        <Link to={`/detail/${encodeURIComponent(emoji.name)}`}>
                            <span dangerouslySetInnerHTML={{__html: emoji.htmlCode[0]}} /> {emoji.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ListView