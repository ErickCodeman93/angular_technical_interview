import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private validation = {
		"card":	{
			"cvc":			/^\d{3,4}$/,
			"exp_month":	/^\d{2}$/,
			"exp_year":		/^\d{4}$/,
			"number":		/^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{3,4}$/
		},
		"contact":	{
			"email":	/^[a-zA-Z0-9.!#$%&â€™*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			"message":	/.{10,500}/,
			"name":		/^(?=.*[aeiouÃ¡Ã Ã¤Ã¢Ã£Ã¥Ä…Ã¦ÄÃ©Ã¨Ã«ÃªÄ™Ä—Ä“Ã­Ã¯Ã¬Ã®Ä¯Ä«Ã³Ã²Ã¶Ã´ÃµÃ¸Å“ÅÃºÃ¼Ã¹Ã»Å«])(?=.*[bcdfghjklmnÃ±pqrstvwxyz])[a-zÃ± Ã¡Ã Ã¤Ã¢Ã£Ã¥Ä…Ã¦ÄÃ©Ã¨Ã«ÃªÄ™Ä—Ä“Ã­Ã¯Ã¬Ã®Ä¯Ä«Ã³Ã²Ã¶Ã´ÃµÃ¸Å“ÅÃºÃ¼Ã¹Ã»Å«]{3,100}$/,
			"subject":	/^(?=.*[(aeiouÃ¡Ã Ã¤Ã¢Ã£Ã¥Ä…Ã¦ÄÃ©Ã¨Ã«ÃªÄ™Ä—Ä“Ã­Ã¯Ã¬Ã®Ä¯Ä«Ã³Ã²Ã¶Ã´ÃµÃ¸Å“ÅÃºÃ¼Ã¹Ã»Å«)|(bcdfghjklmnÃ±pqrstvwxyz)|(0-9)])[\w aeiouÃ¡Ã Ã¤Ã¢Ã£Ã¥Ä…Ã¦ÄÃ©Ã¨Ã«ÃªÄ™Ä—Ä“Ã­Ã¯Ã¬Ã®Ä¯Ä«Ã³Ã²Ã¶Ã´ÃµÃ¸Å“ÅÃºÃ¼Ã¹Ã»Å«]{3,100}$/,
			"tel":		/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d{3,4}[- .]?\d{3,4}$/
		},
		"login":	{
			"password":	/^\d{4}$/,
		}
	};

	getValidation(){
		return this.validation;
	}

	async post ( endpoint:string, payload:any ){

		const config = {
			method : 'POST',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify( payload )
		}
	
		const request = await fetch( endpoint, config );
	
		const data = await request.json();
				
		return data;
	} //end function

	async get ( endpoint:string, token:string ){

		const config = {
			method : 'GET',
			headers: { 
				'Content-Type' : 'application/json' ,
				'x-token' :  token,
			},
			
		}
	
		const request = await fetch( endpoint, config );
	
		const data = await request.json();
				
		return data;
	} //end function
	

  	get_token(){
		
		return localStorage.getItem( 'token' );
	}

	set_token( token:string ){
	  
		localStorage.setItem( 'token', token || '' );
	}

	delete_token(){
		localStorage.removeItem('token');
	}

	check ( status:any ) {

		const codes = [
			200,
			201
		]
	
		if( ! codes.includes( status ) )
			return false
	
		return true;
	
	} //end function


} //end class
