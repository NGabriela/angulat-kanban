import { Component, OnInit, Input } from '@angular/core';
import { createReadStream } from 'fs';
import { Card } from './kanban.model';

@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.css']
})
export class KanbanViewComponent implements OnInit {
  stages = [{
    id: 1,
    name: 'Backlog',
    cards: [],
  }, {
    id: 2,
    name: 'To Do',
    cards: [],
  }, {
    id: 3,
    name: 'Ongoing',
    cards: [],
  }, {
    id: 4,
    name: 'Done',
    cards: [],
  }];
  newTask = '';
  taskToMove: Card | undefined;
  taskToMoveName = '';
  stageIndex = -1;
  isMoveForwardDisabled = true;
  isMoveBackDisabled = true;
 
  constructor() { }

  ngOnInit() {
  }

  onAddCard() {
    const cards = this.stages[0].cards;
    cards.push({id: cards.length, name:this.newTask});
    this.newTask = '';
  }

  onCardselect(data) {
    const {card, stageIndex} = data;
    this.taskToMove = card;
    this.taskToMoveName = card.name;
    this.stageIndex = stageIndex;
    this.setButtonsDisabled();
  }

  onMoveBackCard() {
    if(this.stageIndex >= 1){
      this.removeCard(this.taskToMove);
      const newIndex = this.stageIndex-1;
      this.stages[this.stageIndex-1].cards.push(this.taskToMove);
      this.stageIndex = newIndex;
      this.setButtonsDisabled();
    }
  }

  private setButtonsDisabled(){
    console.log(+this.stageIndex > 3,this.stageIndex);
    this.isMoveForwardDisabled = !this.taskToMoveName || (this.stageIndex >= 3) ;
    this.isMoveBackDisabled = !this.taskToMoveName || (this.stageIndex <= 0);
  }

  onMoveForwardCard() {
   if(this.stageIndex <= 3){
    this.removeCard(this.taskToMove);
     const newStageIndex = this.stageIndex + 1;
     this.stages[newStageIndex].cards.push(this.taskToMove);
     this.stageIndex = newStageIndex;
     this.setButtonsDisabled();
   }
  }

  onDeleteCard() {
    this.removeCard(this.taskToMove);
    this.taskToMove = undefined;
    this.taskToMoveName = '';
  }

  private removeCard(cardToRemove: Card): number {
    let stageIndex = -1;
    this.stages.forEach((stage,i) => 
    {  
      const nrCards =  stage.cards.length;
      stage.cards = stage.cards.filter(card => (card.name !== cardToRemove.name));
      if(nrCards !== stage.cards.length){
        stageIndex = i;
      }
    }
    );

  return stageIndex;
  }

  // private findCard(cardToRemove: Card): number {
  //   let stageIndex = -1;
  //   this.stages.forEach((stage,i) => 
  //   {  
  //     const card = stage.cards.find(card => (card.name === cardToRemove.name));
  //     if(card) stageIndex = i;
  //   }
  //   );

  // return stageIndex;
  // }
}
