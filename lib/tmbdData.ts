export const getTmbdData = async (movie_id : number) : Promise<any> => {

    const connection = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}&append_to_response=credits,translations`);

    return await connection.json();

}