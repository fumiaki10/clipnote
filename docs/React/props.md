そもそもPropsとは 　ここは後で切り取る
jsxタグに渡す情報のこと。
例　className,src,alt,width,heightはimgに渡すことができるpropsの一例
親　⇒　子
export default function Profile(){
  return(
    <test
      person{{name:'takeru',old:20}}
      size={170}
    />
  )
}
親コンポーネントは子コンポーネントにPropsを渡すことで情報を伝えることができる

## 1. Propsとは

* 親コンポーネントから子コンポーネントにデータを渡す仕組み
* 親から子に一方通行でデータが流れる
* 

## 2. なぜPropsを使うのか
## 3. Propsの例
//親コンポーネント
```jsx
const Parent = () = {
  const user = {
    name: "Hanako",
    age: 30,
    location: "Tokyo" //userオブジェクトを作成
  };
  return()
  <div>
    <Child userData={user} /> //userDataという名前のPropsとして子コンポーネントであるChildに渡している
  </div>
}
```
```jsx
//子コンポーネント
  const Child = ({userData}) => {　　//子コンポーネントであるChildがuserDataというPropsを受け取り、その中にあるデータそれぞれ、name,age,locationといったプロパティを取り出して表示
    return(
      <div>
        <p>名前: {userData.name}</p>
        <p>年齢: {userData.age}</p>
        <p>出身: {userData.location}</p>
      </div>
    );
  };
```


文字だけ違うボタンを作る
<MyButton text="ログイン" color="blue"/>
<MyButton text="ログアウト" color="red"/>

function MyButton(props){
  return (
    <button style={{ backgroundColor:props,color}}>{props.text}</button>
  )
}



## 4. ClipNoteではどう使っているか
## 5. 学んだこと
propsは読み取り専用だからデータの上書きはできない
//親コンポーネント
```jsx
const Parent = () => {
    const message = "こんにちは、React!";
    return (
        <div>
            <h1>これは親コンポーネントです。</h1>
            <Child greeting={message} />
        </div>
    );
};
```

//子コンポーネント
```jsx
const Child = (props) => {
    props.greeting = "新しいメッセージ" //エラー: 読み取り専用のプロパティ 'greeting' に値を代入できません
    return (
        <div>
            <h2>これは子コンポーネントです。</h2>
            <p>{props.greeting}</p>
        </div>
    );
};
```
## 6. なぜ？（深掘り）
## 7. よくある疑問
## 8. 関連する技術