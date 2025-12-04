import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JokkoChatComponent } from './components/jokko-chat/jokko-chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JokkoChatComponent, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showChat = false;

  toggleChat() {
    this.showChat = !this.showChat;
  }

  closeChat() {
    this.showChat = false;
  }
}