import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event: Event = new Event();

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=> this.eventService.get(params['id']).subscribe(
        event =>{
          console.log(event);
          this.event = event || new Event();
        }
      )
    );
  }

  onUpdate(eventFrom: NgForm): void {
    eventFrom.value.id = this.event.id;
    this.eventService.update(eventFrom.value).subscribe((event) => {
      this.router.navigate(['/']);
    });
  }
}
