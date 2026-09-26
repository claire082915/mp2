import React from 'react'
import type { Emoji } from '../types/emoji'

interface Props {
    emojis: Emoji[];
}

const DetailView = ({ emojis }: Props) => {
  return (
    <div>DetailView</div>
  )
}

export default DetailView