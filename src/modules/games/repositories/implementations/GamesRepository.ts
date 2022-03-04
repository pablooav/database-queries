import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const result = this.repository
      .createQueryBuilder("games")
      .where(`title like '%:name%'`, { name: param })
      .getMany();
    // Complete usando query builder
    console.log("findByTitleContaining", result);

    return result;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM GAMES"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<Game[]> {
    const result = this.repository
      .createQueryBuilder("users_games_games")
      .innerJoinAndSelect("users.id", "usersId")
      .innerJoin("games.id", "gamesId")
      .where("first_name like '%:name%'", { name: id })
      .getMany();
    // Complete usando query builder
    console.log("findUsersByGameId", result);
    return result;
  }
}
