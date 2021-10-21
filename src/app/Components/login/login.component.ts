import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent {

	constructor( private _servicio:HelperService, private router: Router ){

	} //end constructor

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
		
		const endpoint = 'http://localhost:8080/api/auth/login';
		
		let payload = {
			email: this.email?.value,
			password : this.password?.value
		} 
	
		setTimeout(() => {
	
			this._servicio.post( endpoint , payload ).then( ( response ) => {
	
				Swal.close();
				
				if( response.code != 200 ){
	
					Swal.fire({
						icon: 'error',
						title: response.msg,
						allowOutsideClick: false,
					});	
	
					return;
				} //end if
			
				// this.clearInputs();
	
				this._servicio.set_token( response.token );
	
				this.router.navigateByUrl('/home');
	
			});

		}, 500);

	} //end method

	clearInputs(){
		
		this.loginForm.setValue({
			email: '',
			password :	'',
		});

		this.email?.markAsUntouched();
		this.password?.markAsUntouched();

	} //end method

}
