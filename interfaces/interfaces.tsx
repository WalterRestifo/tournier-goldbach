import { prototype } from "events";

export interface Member {
  name: string;
  tournaments: string[];
  id?: any;
}

export interface Criteria {
  skill: string;
  language: string;
  gender: string;
  name: string;
}

export interface MiniPlayer {
  name: string;
}

export interface Team {
  players: [];
  points: number;
  id: string;
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
