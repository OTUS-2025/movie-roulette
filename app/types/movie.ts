export interface RandomMovie {
    id: string
    name: string
    alternativeName: string
    description: string
    poster: string
    countries: string
}

export interface RandomMovieResponse {
    id: string
    name: string
    alternativeName: string
    description: string
    poster: {
        previewUrl: string 
        url: string
    }
    countries: {name:string}[] 
}

export interface DetailedMovie {
    id: string
    name: string
    alternativeName: string
    poster: {
        url: string
        previewUrl: string
    }
    posterUrl: string
    description: string
}

export interface DetailedMovieResponse {
    docs:Array<DetailedMovie>
}