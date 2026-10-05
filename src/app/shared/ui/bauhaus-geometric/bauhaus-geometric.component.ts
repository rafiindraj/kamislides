import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GeometricVariant = 'trio' | 'circle' | 'triangle' | 'square' | 'composition' | 'duck';

@Component({
  selector: 'app-bauhaus-geometric',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="wrapperClasses()">
      @switch (variant()) {
        @case ('trio') {
          <div class="geo-trio">
            <div class="geo-shape geo-circle" title="Bauhaus Circle (Blue)"></div>
            <div class="geo-shape geo-triangle" title="Bauhaus Triangle (Yellow)"></div>
            <div class="geo-shape geo-square" title="Bauhaus Square (Red)"></div>
          </div>
        }
        @case ('circle') {
          <div class="geo-shape geo-circle"></div>
        }
        @case ('triangle') {
          <div class="geo-shape geo-triangle"></div>
        }
        @case ('square') {
          <div class="geo-shape geo-square"></div>
        }
        @case ('duck') {
          <!-- Geometric Bauhaus Rubber Duck! -->
          <div class="bauhaus-duck-art" title="Bauhaus Rubber Duck">
            <div class="duck-head">
              <div class="duck-eye"></div>
              <div class="duck-beak"></div>
            </div>
            <div class="duck-body">
              <div class="duck-wing"></div>
            </div>
          </div>
        }
        @case ('composition') {
          <div class="geo-composition">
            <div class="comp-box-red"></div>
            <div class="comp-circle-blue"></div>
            <div class="comp-tri-yellow"></div>
            <div class="comp-line-black"></div>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .geo-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .geo-trio {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .geo-shape {
      display: inline-block;
      transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .geo-shape:hover {
      transform: scale(1.15) rotate(6deg);
    }

    /* Circle: Primary Blue */
    .geo-circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: var(--color-secondary);
      border: 2px solid var(--color-border);
    }

    /* Triangle: Tertiary Yellow */
    .geo-triangle {
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-bottom: 24px solid var(--color-tertiary);
      filter: drop-shadow(0 2px 0 var(--color-border));
    }

    /* Square: Primary Red */
    .geo-square {
      width: 22px;
      height: 22px;
      border-radius: 0px;
      background-color: var(--color-primary);
      border: 2px solid var(--color-border);
    }

    /* Geometric Rubber Duck in Bauhaus Primary Yellow, Red & Navy */
    .bauhaus-duck-art {
      width: 140px;
      height: 120px;
      position: relative;
      cursor: pointer;
      transition: transform 200ms ease;
    }
    .bauhaus-duck-art:hover {
      transform: scale(1.05) rotate(-3deg);
    }

    .duck-head {
      position: absolute;
      top: 10px;
      left: 50px;
      width: 50px;
      height: 50px;
      background-color: var(--color-tertiary);
      border: 3px solid var(--color-border);
      border-radius: 50%;
      z-index: 2;
    }

    .duck-eye {
      position: absolute;
      top: 14px;
      left: 30px;
      width: 8px;
      height: 8px;
      background-color: var(--color-neutral);
      border-radius: 0px; /* square Bauhaus eye */
    }

    .duck-beak {
      position: absolute;
      top: 20px;
      left: 45px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 20px solid var(--color-primary);
      filter: drop-shadow(2px 0 0 var(--color-border));
    }

    .duck-body {
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: 90px;
      height: 55px;
      background-color: var(--color-tertiary);
      border: 3px solid var(--color-border);
      border-radius: 0 0 50px 50px;
      z-index: 1;
    }

    .duck-wing {
      position: absolute;
      top: 8px;
      left: 18px;
      width: 45px;
      height: 26px;
      background-color: var(--color-primary);
      border: 2px solid var(--color-border);
      border-radius: 0 0 20px 20px;
    }

    /* Abstract Bauhaus Poster Composition */
    .geo-composition {
      position: relative;
      width: 180px;
      height: 180px;
      border: 3px solid var(--color-border);
      background-color: var(--color-surface-subtle);
      overflow: hidden;
      box-shadow: 6px 6px 0px var(--color-border);
    }

    .comp-box-red {
      position: absolute;
      top: -20px;
      left: -20px;
      width: 90px;
      height: 90px;
      background-color: var(--color-primary);
      border: 2px solid var(--color-border);
    }

    .comp-circle-blue {
      position: absolute;
      bottom: 20px;
      right: 15px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: var(--color-secondary);
      border: 2px solid var(--color-border);
    }

    .comp-tri-yellow {
      position: absolute;
      bottom: -10px;
      left: 20px;
      width: 0;
      height: 0;
      border-left: 35px solid transparent;
      border-right: 35px solid transparent;
      border-bottom: 60px solid var(--color-tertiary);
    }

    .comp-line-black {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: var(--color-border);
      transform: rotate(-25deg);
    }
  `]
})
export class BauhausGeometricComponent {
  readonly variant = input<GeometricVariant>('trio');

  protected wrapperClasses(): string {
    return `geo-wrapper geo-${this.variant()}`;
  }
}
