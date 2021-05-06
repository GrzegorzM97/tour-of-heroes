import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Enemy } from '../enemy';
import { EnemyService } from '../enemy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  enemies: Enemy[] = [];

  constructor(private heroService: HeroService,private enemyService: EnemyService) { }

  ngOnInit() {
    this.getHeroes();
    this.getEnemies();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getEnemies(): void {
    this.enemyService.getEnemies()
      .subscribe(enemies => this.enemies = enemies.slice(0, 5));
  }
}