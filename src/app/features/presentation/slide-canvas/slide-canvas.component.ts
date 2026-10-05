import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISlide } from '../../../core/models/slide.interface';
import { BauhausButtonComponent } from '../../../shared/ui/bauhaus-button/bauhaus-button.component';
import { BauhausCardComponent } from '../../../shared/ui/bauhaus-card/bauhaus-card.component';
import { BauhausBadgeComponent } from '../../../shared/ui/bauhaus-badge/bauhaus-badge.component';
import { BauhausIconComponent } from '../../../shared/ui/bauhaus-icon/bauhaus-icon.component';
import { BauhausGeometricComponent } from '../../../shared/ui/bauhaus-geometric/bauhaus-geometric.component';

@Component({
  selector: 'app-slide-canvas',
  standalone: true,
  imports: [
    CommonModule,
    BauhausButtonComponent,
    BauhausCardComponent,
    BauhausBadgeComponent,
    BauhausIconComponent,
    BauhausGeometricComponent
  ],
  templateUrl: './slide-canvas.component.html',
  styleUrl: './slide-canvas.component.scss'
})
export class SlideCanvasComponent {
  readonly slide = input.required<ISlide>();
  readonly isPresentationMode = input<boolean>(false);
  readonly direction = input<'forward' | 'backward' | 'jump'>('forward');
  readonly isOutgoing = input<boolean>(false);
  readonly motionStyle = input<string>('android-open');

  readonly actionTriggered = output<string>();

  // Interactive slide states
  readonly duckQuackMessage = signal<string>('Halo Bro Rafi! Ceritain kodingan kamu ke aku pelan-pelan...');
  readonly duckQuackCount = signal<number>(0);
  readonly selectedFocusMode = signal<'focus' | 'diffuse'>('focus');
  readonly checklistCompleted = signal<Record<number, boolean>>({});

  // Micro-timer state for Slide 8 (Teknik Menurunkan Stress)
  readonly eyeTimerRunning = signal<boolean>(false);
  readonly eyeTimerSeconds = signal<number>(20);
  private eyeInterval: ReturnType<typeof setInterval> | null = null;

  protected triggerDuckTalk(): void {
    const quacks = [
      '"Kwek! Bro, variabel itu kenapa kamu timpa lagi di baris bawahnya?"',
      '"Santai dulu, coba jelasin alur fungsinya dari awal tanpa terburu-buru!"',
      '"Tunggu bentar... kalau datanya null dari API, emang gak bakal crash tuh?"',
      '"Aha! Nada bicaramu melambat di baris ini. Nah kan, bug-nya ketemu haha!"',
      '"Kwek! Udah ngopi belum? Otak kamu kayaknya butuh kafein deh."'
    ];
    this.duckQuackCount.update(c => c + 1);
    const randomMsg = quacks[this.duckQuackCount() % quacks.length];
    this.duckQuackMessage.set(randomMsg);
  }

  protected toggleChecklistItem(index: number): void {
    this.checklistCompleted.update(map => ({
      ...map,
      [index]: !map[index]
    }));
  }

  protected setFocusMode(mode: 'focus' | 'diffuse'): void {
    this.selectedFocusMode.set(mode);
  }

  protected startEyeExercise(): void {
    if (this.eyeInterval) clearInterval(this.eyeInterval);
    this.eyeTimerSeconds.set(20);
    this.eyeTimerRunning.set(true);

    this.eyeInterval = setInterval(() => {
      this.eyeTimerSeconds.update(sec => {
        if (sec <= 1) {
          clearInterval(this.eyeInterval!);
          this.eyeInterval = null;
          this.eyeTimerRunning.set(false);
          return 20;
        }
        return sec - 1;
      });
    }, 1000);
  }

  protected stopEyeExercise(): void {
    if (this.eyeInterval) {
      clearInterval(this.eyeInterval);
      this.eyeInterval = null;
    }
    this.eyeTimerRunning.set(false);
    this.eyeTimerSeconds.set(20);
  }
}
