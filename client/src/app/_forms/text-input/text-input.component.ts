import { Component, ElementRef, HostListener, Input, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {

  @ViewChild('errorIcon', { static: true }) errorIcon!: ElementRef;

  @Input() label: string = '';
  @Input() type: string = 'text';
  showErrors: boolean = false;


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.errorIcon?.nativeElement.contains(event.target as Node) && this.showErrors) {
      this.showErrors = false;
    }
  }

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void { }

  registerOnTouched(fn: any): void { }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  onErrorIconClick() {
    this.showErrors = true;
  }

  onHover() {
    console.log('hovering')
  }
}
