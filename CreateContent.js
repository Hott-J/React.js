import React,{Component} from 'react';

class CreateContent extends Component{
    render(){
        //console.log("Content render")
      return( //form태그는 리액트안쓸때는 action을 통해 어디로 전송할지 쓴다. post방식으로 해야 url에 노출이 안된다.
        <article>
          <h2>Create</h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){
              e.preventDefault();
              //debugger;
              //alert('submit!!!!')
              this.props.onSubmit(
                e.target.title.value, //form의 첫째값
                e.target.desc.value //form의 둘째값
              );
            }.bind(this)}  
          >
            <p><input type="text" name="title"
            placeholder="title"></input></p>
            <p>
              <textarea name="desc"
              placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit"></input>
            </p>
          </form>
        </article>
      );
    }
}

export default CreateContent;