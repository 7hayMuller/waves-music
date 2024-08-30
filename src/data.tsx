import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Track } from './app/page';


type JamendoApiResponse = {
  results: Track[];
};

export async function fetchTracks(trackName: string): Promise<Track[]> {
  const clientId = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID;

  try {
    const response = await axios.get<JamendoApiResponse>(
      `https://api.jamendo.com/v3.0/tracks/`,
      {
        params: {
          client_id: clientId,
          format: 'json',
          limit: 10,
          namesearch: trackName,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch music data:', error);
    throw new Error('Failed to fetch music data');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { trackName } = req.query;

  try {
    const tracks: Track[] = await fetchTracks(trackName as string);
    res.status(200).json({ results: tracks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch music data' });
  }
}