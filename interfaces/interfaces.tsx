import { prototype } from "events";

export interface Member {
  name: string;
  skill: string;
  languages: string[];
  gender: string;
  id?: any;
  cloudinarySrc: string;
}

export interface Criteria {
  skill: string;
  language: string;
  gender: string;
  name: string;
}

export interface MiniPlayer {
  name: string;
  cloudinarySrc: string;
}

export interface Team {
  players: [];
  points: number;
  id: string;
  wins: number;
  games: number;
}

export interface Match {
  team1: Team;
  team2: Team;
  id: string;
  winner: string;
}

export interface ImageInterface {
  prototype: HTMLImageElement;
  new (): HTMLImageElement;
}
