import { Component, ViewChild  } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HelperService } from 'src/app/service/helper.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	
	token:any;
	data:any = [];
	rows:any = [];
	temp:any = [];
	columns = [{ prop: 'ID' }, { name: 'email' }, { name: 'role' }];
	@ViewChild(DatatableComponent) table! : DatatableComponent;

	ColumnMode = ColumnMode;

	constructor( private router: Router, private _servicio:HelperService ) {
		
		this.token = _servicio.get_token();

		const endpoint = 'http://localhost:8080/api/users';

		_servicio.get( endpoint, this.token ).then( ( response ) => {

			if( response.code !== 200 ){
	
				Swal.fire( {
					confirmButtonText: "Aceptar",
					text : 'No cuentas con los privilegios necesarios.',
					title: "Información clasificada",
					icon : "error",
					allowOutsideClick: false,
				} ).then((result) => {
					
					_servicio.delete_token();

					if (result.isConfirmed) this.router.navigateByUrl('/login');
						
				});
	
				return;
				
			} //end if


			this.data = response.users;
			
			this.temp = [...this.data];
			this.rows = [...this.data];
			
		}); //end request


	}

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
