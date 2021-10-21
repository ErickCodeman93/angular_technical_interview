import { Component, ViewChild  } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	
	type_user:string;

	data:any = [];
	rows:any = [];
	temp:any = [];
	columns = [{ prop: 'ID' }, { name: 'email' }, { name: 'rol' }];
	@ViewChild(DatatableComponent) table! : DatatableComponent;

	ColumnMode = ColumnMode;

	constructor( private router: Router ) {
		// this.fetch( (data:any) => {

		// 	// console.log( data );
			
		// 	// cache our list
		// 	this.temp = [...data];

		// 	// push our inital complete list
		// 	this.rows = data;
		// 	console.log( this.rows );
			
		// });
			
		this.type_user = 'admin';

		if( this.type_user == 'user' ){
	
			Swal.fire( {
				confirmButtonText: "Aceptar",
				text : 'No cuentas con los privilegios necesarios.',
				title: "Información clasificada",
				icon : "error",
			} ).then((result) => {
				
				if (result.isConfirmed) this.router.navigateByUrl('/login');
					
			});

			return;
			
		} //end if

		this.data = [
				{
					ID:1,
					email:"erick@gmail.com",
					rol: "Administrador"
				},
				{
					ID:2,
					email:"alberto@gmail.com",
					rol: "Usuario"
				},
		];
		
		this.temp = [...this.data];
		this.rows = [...this.data];

	}

	// fetch( cb:any ) {
	// 	const req = new XMLHttpRequest();
	// 	req.open('GET', `https://swimlane.github.io/ngx-datatable/assets/data/company.json`);

	// 	req.onload = () => {
	// 		cb(JSON.parse(req.response));
	// 	};

	// 	req.send();
	// }

	updateFilter( event:any ) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp = this.temp.filter(function ( d:any ) {
			return d.email.toLowerCase().indexOf(val) !== -1 || !val;
		});

		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

}
