import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent {

	loginForm = new FormGroup({
		email: new FormControl('', [ Validators.required,Validators.email ] ),
		password : new FormControl('', [ Validators.required ] )
	});

	get email(){
		return this.loginForm.get('email');
	}

	get password(){
		return this.loginForm.get('password');
	}

	onSubmit(){

		if( this.loginForm.invalid ){
			
			this.email?.markAsTouched();
			this.password?.markAsTouched();
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
			password : this.password?.value
		} 

	} //end method

}
