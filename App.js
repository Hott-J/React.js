import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './App.css'; //App.js의 컴포넌트가 로드됬을때 css도 로드됨.
//App안에 있는 디자인을 App안에 넣는다.
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject  from "./components/Subject";
import Control  from "./components/Control";
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component { //컴포넌트를 만드는 코드다.
  constructor(props){ //state값 초기화. 값 세팅으로 아래껄로.
    super(props);
    this.max_content_id=3;
    this.state={
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB',sub:"World Wide Web!"},
      welcome:{title:'welcome',desc:'Hello,react!!'},
      contents:[
        {id:1,title:'HTML',desc:'HTML is ...'},
        {id:2,title:'CSS',desc:'CSS is ...'},
        {id:3,title:'JS',desc:'JS is ...'},
      ]
    }
  }

  getReadContent(){
    var i=0;
      while(i<this.state.contents.length){
        var data=this.state.contents[i];
        if(data.id===this.state.selected_content_id){
          return data;
          break;
        }
        i=i+1;
      }
  }
  
  getContent(){
    var _title, _desc, _article=null;
    if(this.state.mode==='welcome'){
      _title=this.state.welcome.title;
      _desc=this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode==='read'){
      var _content=this.getReadContent();
      _article=<ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode==='create'){
      _article=<CreateContent onSubmit={function(_title,_desc){
          //add content to this.state.contents
        this.max_content_id=this.max_content_id+1;
        var _contents=Array.from(this.state.contents);
        _contents.push({id:this.max_content_id,title:_title,desc:_desc})
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    

  }else if(this.state.mode==='update'){
    _content=this.getReadContent();
    _article=<UpdateContent data={_content} onSubmit=
    {function(_id,_title,_desc){
      var _contents=Array.from(this.state.contents); //복사된 새로운 배열 생성
        //add content to this.state.contents
      var i=0;
      while(i<_contents.length){
        if(_contents[i].id===_id){
          _contents[i]={id:_id,title:_title,desc:_desc};
          break;
        }
        i=i+1;
      }
      this.setState({
        contents:_contents,
        mode:'read'
      });
    }.bind(this)}></UpdateContent>
  }
  return _article;
  }
  render(){ //렌더라는 메소드를 가지고 있다. 어떤 html을 그릴것인가 결정.
    //console.log('App render');
    //console.log('render',this)
    return(
    <div className="App">
      <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){ //props로 넘어감.
          this.setState({mode:'welcome'});
        }.bind(this)}
        >
      </Subject>
      {/*<Subject title="Props" sub="For Refactoring"></Subject>*/}
      {/*<header>
          <h1><a href="/" onClick={function(e){
            //console.log(e);
            e.preventDefault(); //이벤트가 발생한 태그가 있다. 그 태그의 기본적인 동작방법을 못하게 막는다.
            //위에게 없으면, mode가 바뀌고 나서 다시 아래의 a태그가 실행되서 되돌아간다. 리로드 방지.
            //this.state.mode='welcome'; //문제. state의 값이 바뀜을 리엑트는 모름.
            this.setState({ //위에 초기화처럼 코드를 바꾸면 안된다.
              mode:'welcome' //모드가 welcome으로 변경.
            });
            //1.함수 안에있는 this는 null이다.
            //뒤에 .bind(this)를 하면 this는 컴포넌트가 된다.
            //debugger;
            //alert('hi');
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header>*/}
      <TOC
        onChangePage={function(id){ {/*하위 컴포넌트인 TOC 에서 상위 컴포넌트인 APP을 수정하고 싶을땐, 이벤트를 구현해서 제어*/}
          //debugger
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}
        data={this.state.contents}> {/*상위 컴포넌트에서(APP) 하위 컴포넌트인 (TOC)에 명령할땐 data라는 props를 통해 제어*/}
      </TOC>
      <Control onChangeMode={function(_mode){
        if(_mode==='delete'){
          if(window.confirm('really?')){
            var _contents=Array.from(this.state.contents);
            var i=0;
            while(i<_contents.length){
              if(_contents[i].id===this.state.selected_content_id){
                _contents.splice(i,1); //원본변경. id값부터 하나를 지우겠다.
                break;
              }
              i=i+1;
            }
          }
          this.setState({
            mode:'welcome',
            contents:_contents
          });
          alert('deleted')
        }else{
          this.setState({
            mode:_mode
          });
        }
      }.bind(this)}></Control>
     {this.getContent()}
    </div>
  );
}
} //템플릿 같은 거라고 생각하면 된다.

export default App;