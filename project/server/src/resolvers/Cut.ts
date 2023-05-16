import { Arg, Int, Query, Resolver } from 'type-graphql';
import ghibliData from '../data/ghibli';
import { Cut } from '../entities/Cut';
import { Film } from '../entities/Film';

@Resolver(Cut)
export class CutResolver {
  @Query(() => [Cut])
  cuts(@Arg('filmId', () => Int) filmId: Film['id']): Cut[] {
    return ghibliData.cuts.filter((x) => x.filmId === filmId);
  }
}
