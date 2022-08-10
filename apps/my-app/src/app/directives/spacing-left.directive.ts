import { Directive, ElementRef, Input, OnInit } from '@angular/core'

@Directive({
  selector: '[spacingLeft]'
})
export class SpacingLeftDirective implements OnInit {

  @Input() spacingLeft!: number

  constructor(private previewEl: ElementRef) { }

  ngOnInit(): void {
    this.previewEl.nativeElement.style.position = 'relative'
    this.previewEl.nativeElement.style.left = this.spacingLeft + 'px'

  }


}
