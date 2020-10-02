import React,{Component} from 'react';

class TOC extends Component{
  shouldComponentUpdate(newProps,newState){
    console.log('====toc render shouldCU',
    newProps.data,
    this.props.data)
    if(this.props.data===newProps.data){
      return false;
    }
    return true;
  }
    render(){
      console.log('=====toc rendering')
        var lists=[];
        var data=this.props.data
        var i =0;
        while(i<data.length){
            lists.push(
            <li key={data[i].id}>
                <a 
                    href={"/content/"+data[i].id}
                    data-id={data[i].id}
                    onClick={function(e){
                        //console.log(e)
                        e.preventDefault();
                        this.props.onChangePage(e.target.dataset.id);//e.target.dataset.id 값이 id를 가리킨다. 개발자도구에서 확인.
                    }.bind(this)} //bind 함수의 두번째 인자의 값을 함수의 첫번째 인자로 넣어준다.
                    >{data[i].title}</a>
            </li>)
            i=i+1;
        } //여러개의 엘리멘트들을 자동으로 생성하려면 key가 필요하다. 구분할 수 있는 식별자가 필요! 리엑트가 내부적으로 필요해서 요청하는 것.
        return(
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
}

export default TOC;//TOC라는 클래스를 외부에서 사용가능.