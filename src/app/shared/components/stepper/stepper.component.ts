import { CdkStepper } from '@angular/cdk/stepper';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {
  @Input() linearModeSelected = true;

  ngOnInit() {
    this.linear = this.linearModeSelected;
  }

  onClick(index: number) {
    this.selectedIndex = index;
  }
}
