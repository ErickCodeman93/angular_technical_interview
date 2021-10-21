import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent  {

	constructor( private _servicio:HelperService, private router: Router ){

	} //end constructor

	sigInForm = new FormGroup({
		email: 		new FormControl('', [ Validators.required,Validators.email ] ),
		password :	new FormControl('', [ Validators.required ] ),
		rol: 		new FormControl('', [ Validators.required ] )
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
		
		const endpoint = 'http://localhost:8080/api/auth/signIn';

		let payload = {
			email: String( this.email?.value ),
			password : String( this.password?.value ),
			role: String( this.rol?.value )
		} 
	
		setTimeout(() => {
			
			this._servicio.post( endpoint , payload ).then( ( response ) => {
	
				Swal.close();		
	
				if( response.code != 200 ){
					Swal.fire({
						icon: 'error',
						title: response.error,
						allowOutsideClick: false,
					});	
	
					return;
				} //end if
			
				this.clearInputs();
	
				Swal.fire({
					icon: 'success',
					title: 'Registro Exitoso',
					allowOutsideClick: false,
				} ).then((result) => {
					
					if (result.isConfirmed) this.router.navigateByUrl('/login');
						
				});
	
			});

		}, 500);


	} //end method

	clearInputs(){
		
		this.sigInForm.setValue({
			email: '',
			password :	'',
			rol: ''
		});

		this.email?.markAsUntouched();
		this.password?.markAsUntouched();
		this.rol?.markAsUntouched();

	} //end method

} //end class
