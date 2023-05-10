import { Query, Resolver } from 'type-graphql';
import ghibliData from '../data/ghibli';
import { Film } from '../entities/Films';

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  films(): Film[] {
    return ghibliData.films;
  }
}
