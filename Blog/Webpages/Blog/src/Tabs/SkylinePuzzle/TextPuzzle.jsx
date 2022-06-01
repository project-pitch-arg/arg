
import Variables from "../../JSONDocuments/ChangeableValues.json";

export default function TextPuzzle(){

    var currentQuestion = Variables.currentQuestion;

    return (
        <div className="content">
            <div>
                <div className="post">
                    <div className="post-name">
                        1
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[0]}
                    </div>
                </div>

                <div className="post">
                    <div className="post-name">
                        2
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[1]}
                    </div>
                </div>
            </div>

            <div>
                <div className="post">
                    <div className="post-name">
                        3
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[2]}
                    </div>
                </div>

                <div className="post">
                    <div className="post-name">
                        4
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[3]}
                    </div>
                </div>

                <div>
                    {checkAnswer()}
                </div>
            </div>
            
            <div>   
                <div className="post">
                    <div className="post-name">
                        5
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[4]}
                    </div>
                </div>

            
                <div className="post">
                    <div className="post-name">
                        6
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[5]}
                    </div>
                </div>
            </div>

            <div>
                <div className="post">
                    <div className="post-name">
                        7
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[6]}
                    </div>
                </div>

                <div className="post">
                    <div className="post-name">
                        8
                    </div>

                    <div className="post-content">
                        {Variables.textPuzzles[7]}
                    </div>
                </div>
            </div>
        </div>
    )

    function checkAnswer() {
        return (
            <div>
                <div id="questionText">
                    1 = ?
                </div>
                <br />
                <form onSubmit={submitAnswer}>
                    <input type="text" value={sessionStorage["textAnswer"]} onChange={(e) => sessionStorage.setItem("textAnswer", e.target.value)} className="input" placeholder="???" required />
                    <div type="submit" />
                </form>
            </div>
        )
      }

    function submitAnswer(event) {
        event.preventDefault();
        switch (currentQuestion) {
            case 1:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "gmv") {
                    var text = document.getElementById("questionText");
                    text.innerHTML = "2 = ?";
                    currentQuestion = 2;
                }
                break;
            case 2:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "mottagningen") {
                    var text = document.getElementById("questionText");
                    text.innerHTML = "3 = ?";
                    currentQuestion = 3;
                }
                break;
            case 3:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "70") {
                    var text = document.getElementById("questionText");
                    text.innerHTML = "4 = ?";
                    currentQuestion = 4;
                }  
                break;
            case 4:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "8") {
                    var text = document.getElementById("questionText");
                    text.innerHTML = "5 = ?";
                    currentQuestion = 5;
                }
                break;
            case 5:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "taken sequentially") {
                    var text = document.getElementById("questionText");
                    text.innerHTML = "6 = ?";
                    currentQuestion = 6;
                }
                break;
            case 6:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "erasmus and linnaeus palme programmes") {
                    var text = document.getElementById("questionText");
                    text.innerHTML = "7 = ?";
                    currentQuestion = 7;
                }
                break;
            case 7:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "avoided at gu") {
                    var text = document.getElementById("questionText");
                    text.innerHTML = "8 = ?";
                    currentQuestion = 8;
                }
                break;
            case 8:
                if(sessionStorage.getItem("textAnswer").toLocaleLowerCase() === "moa ekbom") {
                    currentQuestion = 1;
                    var text = document.getElementById("questionText");
                    text.innerHTML = "The answer is Triceratops";
                }
                break;
        }
        sessionStorage.removeItem("textAnswer");
        return;
    }
}