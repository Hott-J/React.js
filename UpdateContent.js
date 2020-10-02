import React,{Component} from 'react';

class UpdateContent extends Component{
  constructor(props){
    super(props);
    this.state={
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    this.inputFormHandler=this.inputFormHandler.bind(this); //바인드처리 리팩토링
  }

  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value}); //현재 타겟의 name값이 들어옴.
  }
    render(){
      console.log(this.props.data)
      console.log("UpdateContent render")
      return( //form태그는 리액트안쓸때는 action을 통해 어디로 전송할지 쓴다. post방식으로 해야 url에 노출이 안된다.
        <article>
          <h2>Update</h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){
              e.preventDefault();
              //debugger;
              //alert('submit!!!!')
              this.props.onSubmit(
                this.state.id,
                this.state.title, //form의 첫째값
                this.state.desc //form의 둘째값
              );
            }.bind(this)}  
          >
            <input type="hidden" name="id" value={this.state.id}></input> {/*눈에 보이진않음*/}
            <p><input type="text" name="title"
            placeholder="title" value={this.state.title}
            onChange={this.inputFormHandler}
              //console.log(e.target.value)
             
            ></input></p>
            <p>
              <textarea  onChange={this.inputFormHandler}
              name="desc"
              placeholder="description" 
              value={this.state.desc}></textarea>
            </p>
            <p>
              <input type="submit"></input>
            </p>
          </form>
        </article>
      );
    }
}

export default UpdateContent;