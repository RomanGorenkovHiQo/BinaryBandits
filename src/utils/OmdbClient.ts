'use server'

import { OmdbRequestParameter, omdbRequestUrl } from '@/constants/OmdbConstants';
import axios from 'axios';
import { OmdbMovieResponseDTO } from '@/Dtos/OmdbClientDtos';

export class OmdbClient {
    private requestUrl = omdbRequestUrl;

    public async getFilmById(id: string): Promise<OmdbMovieResponseDTO> {
        const requestUrl = `${this.requestUrl}&${OmdbRequestParameter.Id}=${id}`

        try {
            const response = await axios.get(requestUrl);
            return response.data as OmdbMovieResponseDTO;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}