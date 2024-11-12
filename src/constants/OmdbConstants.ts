import { EnvName } from '@/constants/EnvName';

export const omdbRequestUrl = `http://img.omdbapi.com/?apikey=${process.env[EnvName.OMDB_API_KEY]}`;

export enum OmdbRequestParameter {
    Id = 'i',
    MovieTitle = 't',
    ReturnResultType = 'type',
    Year = 'y',
    PlotSize = 'plot',
    ReturnDataType = 'r',
    JsonpCallbackName = 'callback',
    ApiVersion = 'v',
    PageOfSearch = 'page',
}