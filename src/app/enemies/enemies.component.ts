import { Component, OnInit } from '@angular/core';

import { Enemy } from '../enemy';
import { EnemyService } from '../enemy.service';
@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.css']
})
export class EnemiesComponent implements OnInit {

  enemies: Enemy[]= [];

  constructor(private enemyService: EnemyService) { }

  ngOnInit() {
    this.getEnemies();
  }

  getEnemies(): void {
    this.enemyService.getEnemies()
    .subscribe(enemies => this.enemies = enemies);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.enemyService.addEnemy({ name } as Enemy)
      .subscribe(enemy => {
        this.enemies.push(enemy);
      });
  }

  delete(enemy: Enemy): void {
    this.enemies = this.enemies.filter(h => h !== enemy);
    this.enemyService.deleteEnemy(enemy.id).subscribe();
  }
  
  
}
