import React from 'react'
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
  return (
    <div>GalleryView</div>
  )
}

export default GalleryView