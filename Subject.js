import React,{Component} from 'react';

class Subject extends Component {//무조건 대문자로 시작
    render(){ //컴포넌트는 반드시 하나의 최상위 태그만 써야함.
      return( //아래처럼 props를 사용하여 리팩토링.
        <header>
          <h1><a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

export default Subject;