import Variables from "../../JSONDocuments/ChangeableValues.json";

export default function TextPuzzle(){

    var currentQuestion = Variables.currentQuestion;
    var currentQuestionText = Variables.currentQuestionText;

    return (
        <div className="content">
            <div>
                <div className="post">
                    <div className="post-name">
                        1
                    </div>

                    <div className="post-content">
                        If your university isn't on the map of exchange partners, this means that we do not have an exchange agreement with your university and you will not be able to apply for an exchange at the University of Gothenburg. You are still welcome to apply as a degree-seeking student, which is a separate application process.
                        Exception for IT students: If you are a student within IT, you may be able to apply as an exchange student even if your university is not on the map of exchange partners. 
                    </div>
                </div>

                <div className="post">
                    <div className="post-name">
                        2
                    </div>

                    <div className="post-content">
                        During the third to fifth week, the students' unions arrange welcome week and orientation activities. In Swedish, these events are often referred to as nollning or inspark. These provide an introduction to student life for new students at the University of Gothenburg and can take the form of different planned activities. These can include games, sports, parties, mingle events, dinners and many other forms. There are often activities both with and without alcohol.
                        Information about activities for new students is usually available on the websites of the students' unions, on social media and on notice boards around campus. If you have questions, contact one of the students' unions. 
                    </div>
                </div>
            </div>

            <div>
                <div className="post">
                    <div className="post-name">
                        3
                    </div>

                    <div className="post-content">
                        What is the situation on the Swedish labour market? What is the outlook within your profession or field? It is good to acquire knowledge about these things while studying. You can search the listings on the Swedish Public Employment Service's website and create a profile for yourself that allows employers looking for new employees to find you.
                        Every year The Labour Market Tendency Survey is published, which describes the labour market and outlook for the coming 1-3 years for about 50 educational groups, most of which are university programmes. The survey has been conducted by Statistics Sweden (SCB) each autumn since 1959. It's also a good idea to use services like LinkedIn to be able to research what alumni from your programme or field work with now. 
                    </div>
                </div>

                <div className="post">
                    <div className="post-name">
                        4
                    </div>

                    <div className="post-content">
                        Our 13 libraries offer study environments with large reading rooms, individual study places, computers and group rooms. 
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
                        In many countries, it is common to take several courses in sequential order for the entire semester. At the University of Gothenburg, it is most common to take courses in parallel, i.e., multiple courses simultaneously during the semester. 
                    </div>
                </div>

            
                <div className="post">
                    <div className="post-name">
                        6
                    </div>

                    <div className="post-content">
                        The University of Gothenburg offers student rooms and apartments to exchange students within the Nordplus and INK programmes, as well as to exchange students that come as part of a bilateral agreement.
                        Please note that you have to be nominated by your home university before applying. As an exchange student, you apply for housing as part of your application for exchange studies at the University of Gothenburg. In the application, just state that you would like to apply for student housing, and we will get back to you about the outcome.
                        If you are allocated a student accommodation, we will send instructions, including a code, for how to proceed to be able to register/continue the process at SGS/UGOT. Please note that you should not register at SGS before that since you will then be listed in the queue for all other students. 
                    </div>
                </div>
            </div>

            <div>
                <div className="post">
                    <div className="post-name">
                        7
                    </div>

                    <div className="post-content">
                        Human research <br />
                        More or less all projects involving research on humans and falling under the Ethical Review Act (Etikprövningslagen EPL, SFS 2003:460) require an ethical review by the Swedish Ethical Review Authority(Etikprövningsmyndigheten, EPM).
                        Animal research <br />
                        A large proportion of medical research is conducted in test tubes or by using cell cultures. Animal testing is often performed in lieu of human testing. There are many studies that require animal testing and which can give us better diagnosis and treatment of diseases such as cancer, diabetes, Parkin's and stroke.
                    </div>
                </div>

                <div className="post">
                    <div className="post-name">
                        8
                    </div>

                    <div className="post-content">
                        The Ethics Committee
                        The task of the committee is to support researchers and management in matters that concern research ethics, such as legislation, regulations, guidelines, ethics, health, and the environment.
                        It was set up by the vice-chancellor in March 2021. The committee handles suspected deviations from good research practice that cannot be deemed research misconduct.
                        The committee's secretary is Björn Rydevik, Ethics Administrator at the Grants and Innovation Office. She can answer questions concerning ethical reviews, good practice, requirements from research funders and research partnerships. 
                    </div>
                </div>
            </div>
        </div>
    )

    function checkAnswer() {
        if (currentQuestion !== 9 && !JSON.parse(sessionStorage.getItem("answerFound"))) {
            return (
                <div>
                    {currentQuestionText}
                    <br />
                    <form onSubmit={submitAnswer}>
                        <input type="text" value={sessionStorage["textAnswer"]} onChange={(e) => sessionStorage.setItem("textAnswer", e.target.value)} className="input" placeholder="???" required />
                        <div type="submit" />
                    </form>
                </div>
          )
        } else {
            return (
                <div>
                    The answer is Triceratops.

                    <button onClick={reset()}>
                        Reset puzzle.
                    </button>
                </div>
            )
          }
      }

    function reset() {
        currentQuestion = 1;
        currentQuestionText = "1 = ?";
        sessionStorage.setItem("answerFound", false);
        return;
    }

    function submitAnswer(event) {
        event.preventDefault();
        switch (currentQuestion) {
            case 1:
                if(sessionStorage.getItem("textAnswer") === "Music and drama students") {
                    currentQuestionText = "2 = ?";
                    currentQuestion = 2;
                    console.log("2 = ?");
                }
                break;
            case 2:
                if(sessionStorage.getItem("textAnswer") === "Nollning") {
                    currentQuestionText= "3 = ?";
                    currentQuestion = 3;
                    console.log("3 = ?");
                }
                break;
            case 3:
                if(sessionStorage.getItem("textAnswer") === "70") {
                    currentQuestionText = "4 = ?";
                    currentQuestion = 4;
                    console.log("4 = ?");
                }  
                break;
            case 4:
                if(sessionStorage.getItem("textAnswer") === "8") {
                    currentQuestionText = "5 = ?";
                    currentQuestion = 5;
                    console.log("5 = ?");
                }
                break;
            case 5:
                if(sessionStorage.getItem("textAnswer") === "Sequentially") {
                    currentQuestionText = "6 = ?";
                    currentQuestion = 6;
                    console.log("6 = ?");
                }
                break;
            case 6:
                if(sessionStorage.getItem("textAnswer") === "Erasmus and Linnaeus Palme programmes") {
                    currentQuestionText = "7 = ?";
                    currentQuestion = 7;
                    console.log("7 = ?");
                }
                break;
            case 7:
                if(sessionStorage.getItem("textAnswer") === "Avoided") {
                    currentQuestionText = "8 = ?";
                    currentQuestion = 8;
                    console.log("8 = ?");
                }
                break;
            case 8:
                if(sessionStorage.getItem("textAnswer") === "Moa Ekbom") {
                    currentQuestion = 9;
                    sessionStorage.setItem("answerFound", true);
                    console.log("The answer is Triceratops");
                }
                break;
        }
        sessionStorage.removeItem("textAnswer");
        return;
    }
}