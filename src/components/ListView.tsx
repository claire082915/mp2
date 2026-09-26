import React from 'react'
import { Link } from 'react-router-dom'
import type { Emoji } from '../types/emoji'

interface Props {
    emojis: Emoji[];
}

const ListView = ({ emojis }: Props) => {
  return (
    <div>ListView</div>
  )
}

export default ListView