import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() label: string = '';
  @Input() maxDate: Date | undefined;

  @ViewChild('daysContainer', { static: true }) daysContainer!: ElementRef;
  @ViewChild('currentMonthElement', { static: true }) currentMonthElement!: ElementRef;
  @ViewChild('datePicker', { static: true }) datePicker!: ElementRef;
  @ViewChild('datePickerContainer', { static: true }) datePickerContainer!: ElementRef;
  @ViewChild('toggleDatepicker', { static: true }) toggleDatePicker!: ElementRef;
  @ViewChild('prevMonthButton', { static: true }) prevMonthButton!: ElementRef;
  @ViewChild('nextMonthButton', { static: true }) nextMonthButton!: ElementRef;
  @ViewChild('cancelButton', { static: true }) cancelButton!: ElementRef;
  @ViewChild('applyButton', { static: true }) applyButton!: ElementRef;

  currentDate: Date = new Date();
  selectedDate: null | string = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.datePicker.nativeElement.contains(event.target as Node) &&
      !this.datePickerContainer.nativeElement.contains(event.target as Node)) {
      this.datePickerContainer.nativeElement.classList.add('hidden');
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

  ngOnInit(): void { }

  toggleDatepickerContainer(): void {
    this.datePickerContainer.nativeElement.classList.toggle('hidden');
    this.renderCalendar();
  }

  changeMonth(offset: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    this.renderCalendar();
  }

  applySelection(): void {
    if (this.selectedDate)
      this.datePicker.nativeElement.value = this.selectedDate;

    this.datePickerContainer.nativeElement.classList.add('hidden');
  }


  renderCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Update current month display
    this.currentMonthElement.nativeElement.textContent = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Clear the days container before rendering
    this.daysContainer.nativeElement.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDiv = document.createElement('div');
      this.daysContainer.nativeElement.appendChild(emptyDiv);
    }

    this.addDaysOfTheMonth(month, year, daysInMonth, firstDayOfMonth);
  }

  addDaysOfTheMonth(month: number, year: number, daysInMonth: number, firstDayOfMonth: number) {
    for (let day = 1; day <= daysInMonth; day++) {

      const daysInGrid = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7; // Total grid slots
      const totalRows = daysInGrid / 7; // Total rows in the calendar grid
      const lastRowStartIndex = (totalRows - 1) * 7 - firstDayOfMonth;
      const isLastRow = day + firstDayOfMonth > lastRowStartIndex;

      const dayDiv = this.createDayDiv(day, isLastRow);
      this.daysContainer.nativeElement.appendChild(dayDiv);

      dayDiv.addEventListener('click', () => {
        this.selectedDate = `${day}/${month + 1}/${year}`;
        this.applySelection();
      });
    }

    this.highlightSelectedDate(month + 1, year);
  }

  createDayDiv = (index: number, isLastRow: boolean) => {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = index.toString();
    dayDiv.className = `flex h-[28px] w-[28px] items-center justify-center rounded-[7px] border-[.5px] border-transparent text-dark hover:border-stroke hover:bg-gray-2 sm:h-[28px] sm:w-[28px] dark:hover:border-dark-3 dark:hover:bg-dark ${isLastRow ? '' : 'mb-2'} select-none cursor-pointer`;

    return dayDiv;
  }

  highlightSelectedDate(month: number, year: number) {
    if (this.selectedDate != null) {
      const [selectedDay, selectedMonth, selectedYear] = this.selectedDate.split('/').map(Number);
      const dayDivs = this.daysContainer.nativeElement.querySelectorAll('div');

      for (let i = 0; i < dayDivs.length; i++) {
        const dayDiv = dayDivs[i] as HTMLElement;

        if (Number(dayDiv.textContent) === selectedDay && month === selectedMonth && year === selectedYear) {
          dayDiv.classList.add('bg-primary', 'text-white', 'dark:text-white');
          break;
        }
      };
    }

  }

  ngOnDestroy(): void {
    this.selectedDate = null;
  }

}
