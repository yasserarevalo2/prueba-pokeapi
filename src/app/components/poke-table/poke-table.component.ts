import { Component, OnInit, ViewChild } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  displayedColums: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private PokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.GetPokemons();
  }

  GetPokemons(){
    for(let i = 1; i <= 150; i++){
    this.PokeapiService.GetPokemons(i).subscribe(
      res => {
        console.log(res);
      },
      err=>{

      }
    );
  }
  }
}
