import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState(null)

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])
  
  function onPost(newQuestion){
    setQuestions([...questions, newQuestion])
  }

  function handleDelete(id){
    setQuestions(questions.filter(question => question.id !== id))
  }

  function handlePatch(item){
    setQuestions(questions.map(question =>{
      if (question.id === item.id){
        return item
      }
      else{
        return question
      }
    }))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onPost={onPost}/> : <QuestionList questions={questions} onDelete={handleDelete} onPatch={handlePatch}/>}
    </main>
  );
}

export default App;
