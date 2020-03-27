import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResultService} from '../../../services/result.service';
import {Result} from '../../../models/result.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  private quizResult: Result;

  constructor(private route: ActivatedRoute, private resultService: ResultService) {
    this.resultService.resultSelected$.subscribe((result) => this.quizResult = result); // set class var quiz
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.resultService.setSelectedResult(id);
  }

}
