import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.scss']
})
export class ConversionsComponent implements OnInit {

  @Input() fromCountry!: string;
  @Input() toCountry!: string;
  @Input() rates!: number;
  @Input() amount!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
