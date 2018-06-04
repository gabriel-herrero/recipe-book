import { Directive, OnInit, ElementRef, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})


export class DropDownDirective implements OnInit {

  constructor(private elRef: ElementRef) {}
  ngOnInit() {}

  @HostBinding('class.open') opened = false;

  @HostListener('click') onMouseClick(eventData: Event) {
    this.opened = !this.opened;
  }

}
