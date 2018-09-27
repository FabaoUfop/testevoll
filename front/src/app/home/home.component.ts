import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {NgForm} from '@angular/forms';

//import { AngularFireDatabase } from '@angular/fire/database';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	navbarOpen = false;

	lat:string
	lng:string
	result: boolean = false;
	showMap: boolean = false;
	salvo: boolean = false;
	lat: number = -19.82519036;
	lng: number = -40.65804826;

	public modalRef: BsModalRef;

	constructor(private modalService: BsModalService,private BuscaLatLngService: BuscaLatLngService, 
		private db: AngularFireDatabase) { }
	ngOnInit() {
	}

	public openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	buscaEnd(lat,lng) {
	
	this.BuscaLatLngService.getlatlng(endereco).subscribe(data => {
				let result = data['results'];
				this.lat = result[0].geometry.location.lat;
				this.lng = result[0].geometry.location.lng;

				localStorage.setItem("geocode", JSON.stringify(result[0].geometry.location));

				this.showMap = true;

			}, errr => {
				console.log(errr);
			});

		 err => {
			console.log(err);
		};
	}

	toggleNavbar() {
		this.navbarOpen = !this.navbarOpen;
	}

	onSubmit(form: NgForm) {
		let geo = JSON.parse(localStorage.getItem("geocode"));

		let receita = JSON.parse(localStorage.getItem("dadosReceita"));

		let f = form.value;

		let entidade = {
			geo: geo,
			receita: receita,
			form: f
		};
		this.db.list('/trajetos').push({ geo: geo,
			receita: receita,
			form: f });

		console.log('## onsubmit ##');

		this.modalRef.hide();

		this.salvo = true;

	}


}
