import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Enemy } from '../enemy';
import { EnemyService } from '../enemy.service';

@Component({
  selector: 'app-battles',
  templateUrl: './battles.component.html',
  styleUrls: ['./battles.component.css']
})
export class BattlesComponent implements OnInit {

  heroes: Hero[]= [];
  enemies: Enemy[]= [];

  hero: string = '';
  enemy: string = '';
  batleWinner: string = '';

  constructor(private heroService: HeroService,private enemyService: EnemyService) { }

  ngOnInit() {
    this.getHeroes();
    this.getEnemies();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  getEnemies(): void {
    this.enemyService.getEnemies()
    .subscribe(enemies => this.enemies = enemies);
  }

  selectHero (event: any) {
    this.hero = event.target.value;
  }

  selectEnemy (event: any) {
    this.enemy = event.target.value;
  }

  batle(){

    if(this.enemy === '')
        this.enemy = this.enemies[0].name;

    if(this.hero === '')
        this.hero = this.heroes[0].name;

    if(this.enemy != '' && this.hero != ''){
        var rand  = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        if(rand == 0)
            this.batleWinner = "The batle winner is: " + this.hero;
        else
            this.batleWinner = "The batle winner is: " + this.enemy; 
    }
    else{

    }

  }
}
