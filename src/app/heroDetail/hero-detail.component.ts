import { Component, OnInit }   from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { HeroService }                from '../shared/services';
import { Hero }                       from '../shared/entities/core.entities';
import '../../style/app.scss';

@Component({
  moduleId: 'module.id',
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ){}


  hero: Hero;

  ngOnInit(): void{
    this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.heroService.getHero(id).then(hero => this.hero = hero);
    });
  }

  goBack(): void{
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

}
