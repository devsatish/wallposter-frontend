import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {Post} from '../models/post';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  content: string;
  allPosts:Array<Post>  = new Array();

  constructor(private userService: UserService,private tokenStorageService: TokenStorageService) { }

  ngOnInit() {

     this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.userService.getAllPosts().subscribe(
      (data) => {
          data = JSON.parse(data);
          data.forEach(p => this.allPosts.push(p))
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
