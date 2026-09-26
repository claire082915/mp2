import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Emoji } from '../types/emoji';

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
        return emojis.filter((e) => selectedCategories.includes(e.category));
    }, [emojis, selectedCategories])

    return (
        <>
            <div>
                {CATEGORIES.map((cat) => (
                    <label key={cat}>
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                        />
                        {cat}
                    </label>
                ))}
            </div>

            <div>
                {filteredEmojis.map((emoji) => (
                    <Link key={emoji.name} to={`/detail/${encodeURIComponent(emoji.name)}`}>
                        <div>
                            <span dangerouslySetInnerHTML={{__html: emoji.htmlCode[0]}} />
                            <p>{emoji.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default GalleryView