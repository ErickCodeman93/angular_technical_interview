import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent  {

	sigInForm = new FormGroup({
		email: 			new FormControl('', [ Validators.required,Validators.email ] ),
		password :	new FormControl('', [ Validators.required ] ),
		rol: 				new FormControl('', [ Validators.required ] )
	});
	
	get email(){
		return this.sigInForm.get('email');
	}

	get password(){
		return this.sigInForm.get('password');
	}

	get rol(){
		return this.sigInForm.get('rol');
	}

	onSubmit(){

		if( this.sigInForm.invalid ){
			
			this.email?.markAsTouched();
			this.password?.markAsTouched();
			this.rol?.markAsTouched();
			return;
		
		} //end if
		
		Swal.fire({
			title : 'Iniciando sesión',
			text: 'Espere un momento por favor',
			icon: 'info',
			allowOutsideClick: false,
		});
		Swal.showLoading();
		
		
		let payload = {
			email: this.email?.value,
			password : this.password?.value,
			rol: this.rol?.value
		} 

	} //end method

} //end class
