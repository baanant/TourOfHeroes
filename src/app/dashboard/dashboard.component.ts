import { Component, OnInit }    from '@angular/core';
import { Hero }                 from '../shared/entities/hero';
import { HeroService }          from '../shared/services/hero.service';
import '../../style/app.scss';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}