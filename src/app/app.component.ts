import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'calculator';

  public display:string="0";
  public tmpSavedContent:number=0;
  public operation:string="";
  public operationLocked:boolean=false;
  public savedValue:number=0;

  setDisplayContent(event:Event){
    var content = (<HTMLInputElement>event.target).value;

    switch(content){
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.display = (this.display === "0") ? //if "0"
          content : 
          (this.display === "-") ? //if "-"
            this.display + content :
            (this.operationLocked === true) ? //+,-,*,/ loaded           
              //allows to clean the display's content
              content : 
              this.display + content; 
        this.operationLocked = false; //unlock operation
        break;
      case "C":
        this.tmpSavedContent = 0;
        this.resetDisplayContent();
        break;
      case "MC":
        this.savedValue = 0;
        break;
      case "MS":
        this.savedValue = parseFloat(this.display);
        break;
      case "MR":
        this.display = this.savedValue.toString();
        break;
      case "M+":
        this.display = (parseFloat(this.display) + this.savedValue).toString();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "±":
      case "x2":
      case "√":
      case "1/x":
        if(content === "-" && this.display === "0"){ this.display = "-"; }
        this.operation = content;
        this.operationLocked = true; //lock operation
        this.tmpSavedContent = parseFloat(this.display);
        break;
      case "=":
        this.operationLocked = false; //unlock operation
        if(this.display.endsWith(".")){
          this.display = "Error"
        } else {
          this.runOperation();
        }
        break;
      default: 
        this.display += content;
        break;
    }
  }

  runOperation(){
    switch(this.operation){
      case "+":
        this.display = (this.tmpSavedContent + parseFloat(this.display)).toString();
        break;
      case "-":
        this.display = (this.tmpSavedContent - parseFloat(this.display)).toString();
        break;
      case "*":
        this.display = (this.tmpSavedContent * parseFloat(this.display)).toString();
        break;
      case "/":
        this.display = (this.tmpSavedContent / parseFloat(this.display)).toString();
        break;
      case "±":
        this.display = (Math.abs(parseFloat(this.display))).toString();
        break;
      case "x2":
        this.display = (Math.pow(parseFloat(this.display),2)).toString();
        break;
      case "√":
        this.display = (Math.sqrt(parseFloat(this.display))).toString();
        break;
      case "1/x":
        this.display = (1/(parseFloat(this.display))).toString();
        break;
    }
    this.tmpSavedContent = parseFloat(this.display);
  }

  resetDisplayContent(){ this.display = "0"; }

  resetTmpSavedContent(){ this.tmpSavedContent = 0; }

  setOperation(operation:string){
    this.operation = operation;
  }

}
