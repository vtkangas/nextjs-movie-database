import { Collection, MongoClient, ObjectId } from 'mongodb';

const client : MongoClient = new MongoClient(process.env.DB_URI!);

export interface Movie {
  _id : ObjectId;
  nimi : string;
  alkuperainennimi : string;
  valmistumisvuosi : number;
  ohjaaja : string[];
  genre : string[];
  tuotantomaa : string[];
  kestomin : number;
  imdbid : string;
  imdburl : string;
  tmdbid : number;
  tmdbkuva : string;
}

type SortDirection = 1 | -1;

interface SortOption {
  [key: string]: SortDirection;
}

export const getMovieById = async ( id : string ) : Promise<any> => {
  //muodostetaan yhteys
  await client.connect();
  //haetaan kokoelma
  const movies : Collection<Movie> = client.db().collection("movies");
  //haetaan leffa id:llä
  return movies.findOne({ _id : new ObjectId(id) })
}

export const getLatestMovies = async () : Promise<any> => {

  await client.connect();

  const movies : Collection<Movie> = client.db().collection("movies");

  //haetaan 40 viimeisintä lisäystä
  return movies
          .find({  })
          .sort({_id: -1})
          .limit(40)
          .toArray();

}

export const getMoviesByGenre = async ( genre : string, page : number, order? : string ) : Promise<any> => {

  await client.connect();

  const movies : Collection<Movie> = client.db().collection("movies");

  const sortOption : SortOption = {};

  if (order === 'date-asc') {
    sortOption['_id'] = 1;
  } else if (order === 'name-desc') {
    sortOption['nimi'] = -1;
  } else if (order === 'name-asc') {
    sortOption['nimi'] = 1;
  } else {
    sortOption['_id'] = -1;
  }

  return movies
          .find(( { genre: { $in: [genre] }}))
          .sort(sortOption)
          .skip((page - 1) * 40)
          .limit(40)
          .toArray();

}

export const sortMovies = async ( order : string,  page? : number, genre? : string ) : Promise<any> => {

  await client.connect();

  const movies : Collection<Movie> = client.db().collection("movies");

  //haetaan genren mukaan, jos on valittu
  const matchStage = { '$match': genre ? { genre } : {} }
  //asetetaan valittu järjestys
  const sortStage = order === 'date-asc' 
                                ? { '$sort': { '_id': 1 }} 
                                : order === 'date-desc' 
                                  ? { '$sort': { '_id': -1 }} 
                                  : order === 'name-asc' 
                                    ? { '$sort': { 'nimi': 1 }} 
                                    : { '$sort': { 'nimi': -1 }}; 
                                  
  const pageStage = page ? { '$skip' : (page - 1) * 40 } : { '$skip' : 0 };

  const pipeline = [
                    matchStage, 
                    { '$sort': { '_id': -1 } },
                    pageStage,
                    { '$limit': 40 },
                    sortStage
  ];

  return movies.aggregate(pipeline).toArray();

}

export const getCount = async ( genre : string ) : Promise<any> => {

  await client.connect();

  const movies : Collection<Movie> = client.db().collection("movies");

  return movies.countDocuments(( { genre: { $in: [genre] }}));

}

export const getCollectionMovies = async ( ids : string[] ) : Promise<any[]> => {
  try {

    await client.connect();
    const movies : Collection<Movie> = client.db().collection("movies");
    const objectIds = ids.map(id => new ObjectId(id));
    
    return movies.find({ _id: { $in: objectIds } }).toArray();
  } catch (error) {
      console.error("Error in getCollectionMovies:", error);
      return []; 
  }

}