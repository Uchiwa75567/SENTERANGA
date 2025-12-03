import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { MarketplaceSectionComponent } from '../../components/marketplace-section/marketplace-section.component';
import { ActorsSectionComponent } from '../../components/actors-section/actors-section.component';
import { ForumSectionComponent } from '../../components/forum-section/forum-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { heroStats, marketplaceCategories, actorCards, forumCategories, recentPosts } from '../../data/landing-page.data';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, MarketplaceSectionComponent, ActorsSectionComponent, ForumSectionComponent, FooterComponent],
  templateUrl: './landing.component.html'
})
export class LandingComponent {
  heroStats = heroStats;
  marketplaceCategories = marketplaceCategories;
  actorCards = actorCards;
  forumCategories = forumCategories;
  recentPosts = recentPosts;
}