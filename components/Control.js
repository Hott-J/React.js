import React,{Component} from 'react';

class Control extends Component {//무조건 대문자로 시작
    render(){ //컴포넌트는 반드시 하나의 최상위 태그만 써야함.
      return( //아래처럼 props를 사용하여 리팩토링.
        <ul>
            <li><a href="/create" onClick={function(e){
                e.preventDefault();
                this.props.onChangeMode('create');
            }.bind(this)}>create</a></li>
            <li><a href="/update"onClick={function(e){
                e.preventDefault();
                this.props.onChangeMode('update');
            }.bind(this)}>update</a></li>
            <li><input onClick={function(e){
                e.preventDefault();
                this.props.onChangeMode('delete');
            }.bind(this)}type="button" value="delete"></input></li> {/*delete는 버튼을 클릭할때 실제로 삭제됨. 링크를 쓰게되면 문제발생.
        delete로 되어있는데 미리 방문되고 삭제될 수 있음. */}
      </ul>
      );
    }
  }

export default Control;