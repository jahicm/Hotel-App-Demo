import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, , Validators.email]],
      roomNumber: ['', Validators.required],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
   
    if(id)
    {
        let reservation = this.reservationService.getReservation(id).subscribe(res=>{
        if(res)
            this.reservationForm.patchValue(res);
        });

        
    }
  }
  onSubmit() {
  
    
    if (this.reservationForm.valid) {
      
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
     
      if(id)
      {
          
           this.reservationService.updateReservations(id,reservation).subscribe(()=>{
              console.log("Update processed");
      });
      }else
      {
        this.reservationService.addReservation(reservation).subscribe(reservation=>{
          console.log("Reservation Posted");
        });
        
      }
      this.router.navigate(['/list']);
    }
  }
}
