import axios from 'axios';
import type { Emoji } from '../types/emoji';

const API_URL = 'https://emojihub.yurace.pro/api';

export const fetchAllEmojis = async (): Promise<Emoji[]> => {
    const response = await axios.get<Emoji[]>(`${API_URL}/all`);
    return response.data;
}

export const fetchEmojiByName = async (name: string): Promise<Emoji> => {
    const response = await axios.get<Emoji[]>(`${API_URL}/search?q=${encodeURIComponent(name)}`);
    return response.data[0];
}