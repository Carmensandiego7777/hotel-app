import { Component ,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router ,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent  implements OnInit {



  reservationForm: FormGroup= new FormGroup({});
  minDate: string;

  constructor(private formBuilder: FormBuilder,private reservationService:ReservationService,private router:Router,
  private activatedRoute: ActivatedRoute) {
    this.minDate = new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.reservationForm=this.formBuilder.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      guestName:['',Validators.required],
      guestEmail:['',[Validators.required, Validators.email]],
      guestNumber:['',Validators.required],
    })
    let id= this.activatedRoute.snapshot.paramMap.get('id')
    if(id){
      let reservation=this.reservationService.getReservation(id);
      if(reservation)
      this.reservationForm.patchValue(reservation);
    }
  } 
  onSubmit(){
    if(this.reservationForm.valid){
      // console.log("valid")
      let reservation: Reservation =this.reservationForm.value;

      let id= this.activatedRoute.snapshot.paramMap.get('id')
      if(id){
        
        this.reservationService.updateReservation(id,reservation)
      if(reservation)
        this.reservationService.addReservation(reservation)
      }

      this.reservationService.addReservation(reservation);

      this.router.navigate(['/list']);

      
    }
  }
}
