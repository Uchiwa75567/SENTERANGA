import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'jokko';
  timestamp: Date;
}

@Component({
  selector: 'app-jokko-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jokko-chat.component.html',
  styleUrls: ['./jokko-chat.component.css']
})
export class JokkoChatComponent {
  @Output() close = new EventEmitter<void>();
  
  messages: ChatMessage[] = [
    {
      id: '1',
      text: 'Rapidly build stunning Web Apps with Frest🚀 Developer friendly, Highly customizable & Carefully crafted HTML Admin Dashboard Template.',
      sender: 'jokko',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '2',
      text: 'Minimum text check, Hide check icon',
      sender: 'user',
      timestamp: new Date(Date.now() - 3 * 60 * 1000)
    }
  ];
  
  messageText = '';

  onClose() {
    this.close.emit();
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.messages.push({
        id: Date.now().toString(),
        text: this.messageText,
        sender: 'user',
        timestamp: new Date()
      });
      this.messageText = '';
      
      // Simulate Jokko AI response
      setTimeout(() => {
        this.messages.push({
          id: Date.now().toString(),
          text: 'Merci pour votre message! Comment puis-je vous aider aujourd\'hui?',
          sender: 'jokko',
          timestamp: new Date()
        });
      }, 1000);
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }
}