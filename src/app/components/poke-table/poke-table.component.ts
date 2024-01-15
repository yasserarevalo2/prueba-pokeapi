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
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private PokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.GetPokemons();
  }

  GetPokemons(){
    let pokemonData;
    for(let i = 1; i <= 150; i++){
    this.PokeapiService.GetPokemons(i).subscribe(
      res => {
        pokemonData = {
          position: i,
          image: res.sprites.front_default,
          name: res.name
        };
        this.data.push(pokemonData);
        this.datasource = new MatTableDataSource<any>(this.data);
        this.datasource.paginator = this.paginator;
      },
      err=>{
        console.log(err);

      }
    );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

}
